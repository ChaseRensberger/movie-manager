import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import {
  saltAndHashPassword,
  EXPIRATION_TIME,
  generateSessionToken,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = SignupFormSchema.parse({
      email: body.email,
      password: body.password,
    });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const hashedPassword = saltAndHashPassword(password);

    const { user, sessionToken } = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const session = await tx.session.create({
        data: {
          token: generateSessionToken(),
          userId: user.id,
          expiresAt: new Date(Date.now() + EXPIRATION_TIME),
        },
      });

      return { user, sessionToken: session.token };
    });

    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + EXPIRATION_TIME),
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
