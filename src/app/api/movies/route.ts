import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}

export async function POST(request: Request) {
  const movie = await request.json();
  const newMovie = await prisma.movie.create({ data: movie });
  return NextResponse.json(newMovie);
}

export async function DELETE(request: Request) {
  const movie = await request.json();
  const deletedMovie = await prisma.movie.delete({ where: { id: movie.id } });
  return NextResponse.json(deletedMovie);
}

export async function PATCH(request: Request) {
  const movie = await request.json();
  const updatedMovie = await prisma.movie.update({
    where: { id: movie.id },
    data: {
      title: movie.title,
      year: movie.year,
      image: movie.image,
    },
  });
  return NextResponse.json(updatedMovie);
}
