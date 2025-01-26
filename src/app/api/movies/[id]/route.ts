import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";
import { cookies } from "next/headers";
import { getUserFromSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromSession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const movie = await prisma.movie.findUnique({
    where: { id: params.id, userId: user.id },
  });
  return NextResponse.json(movie);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromSession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const movie = await prisma.movie.delete({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserFromSession(sessionToken);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const movie = await request.json();
  const updatedMovie = await prisma.movie.update({
    where: { id: params.id, userId: user.id },
    data: {
      title: movie.title,
      year: movie.year,
      image: movie.image,
    },
  });
  return NextResponse.json(updatedMovie);
}
