import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/utils";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");

    if (sessionToken) {
      await prisma.session.delete({
        where: {
          token: sessionToken.value,
        },
      });

      cookieStore.delete("session");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
