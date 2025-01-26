import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import {
  verifyPassword,
  EXPIRATION_TIME,
  generateSessionToken,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = SigninFormSchema.parse({
      email: body.email,
      password: body.password,
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    const session = await prisma.session.create({
      data: {
        token: generateSessionToken(),
        userId: user.id,
        expiresAt: new Date(Date.now() + EXPIRATION_TIME),
      },
    });

    cookieStore.set("session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + EXPIRATION_TIME),
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
