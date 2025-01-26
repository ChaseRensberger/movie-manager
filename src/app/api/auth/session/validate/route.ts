import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import { z } from "zod";

const SessionValidateSchema = z.object({
  token: z.string().min(1, { message: "Session token is required" }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = SessionValidateSchema.parse({
      token: body.token,
    });

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Invalid session token" },
        { status: 401 }
      );
    }

    if (new Date() > session.expiresAt) {
      await prisma.session.delete({
        where: { token },
      });
      return NextResponse.json(
        { error: "Session has expired" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: session.user.id,
        email: session.user.email,
      },
    });
  } catch (error) {
    console.error("Session validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate session" },
      { status: 500 }
    );
  }
}
