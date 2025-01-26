import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromSession(sessionToken);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const movies = await prisma.movie.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json(movies);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromSession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const movieData = await request.json();
  const newMovie = await prisma.movie.create({
    data: {
      ...movieData,
      userId: user.id,
    },
  });
  return NextResponse.json(newMovie);
}
