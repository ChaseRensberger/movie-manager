import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils";

export async function GET() {
  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies);
}

export async function POST(request: Request) {
  const movie = await request.json();
  const newMovie = await prisma.movie.create({ data: movie });
  return NextResponse.json(newMovie);
}
