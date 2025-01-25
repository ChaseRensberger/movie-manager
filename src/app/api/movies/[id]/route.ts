import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(movie);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const movie = await prisma.movie.delete({
      where: {
        id: params.id,
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
  const movie = await request.json();
  const updatedMovie = await prisma.movie.update({
    where: { id: params.id },
    data: {
      title: movie.title,
      year: movie.year,
      image: movie.image,
    },
  });
  return NextResponse.json(updatedMovie);
}
