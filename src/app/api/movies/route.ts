import { NextResponse } from "next/server";
import { Movie } from "@/types";

const movies: Movie[] = [
  {
    id: "1",
    title: "Movie 1",
    year: "2021",
    image: "/sample.jpeg",
  },
  {
    id: "2",
    title: "Movie 2",
    year: "2022",
    image: "/sample.jpeg",
  },
  {
    id: "3",
    title: "Movie 3",
    year: "2023",
    image: "/sample.jpeg",
  },
  {
    id: "4",
    title: "Movie 4",
    year: "2024",
    image: "/sample.jpeg",
  },
  {
    id: "5",
    title: "Movie 5",
    year: "2025",
    image: "/sample.jpeg",
  },
  {
    id: "6",
    title: "Movie 6",
    year: "2026",
    image: "/sample.jpeg",
  },
  {
    id: "7",
    title: "Movie 7",
    year: "2027",
    image: "/sample.jpeg",
  },
  {
    id: "8",
    title: "Movie 8",
    year: "2028",
    image: "/sample.jpeg",
  },
];

export async function GET() {
  return NextResponse.json(movies);
}
