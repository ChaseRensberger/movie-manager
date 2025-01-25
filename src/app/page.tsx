"use client";
import MovieCard from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SignOut, PlusCircle } from "@phosphor-icons/react";
import Link from "next/link";

const movies = [
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

export default function Home() {
  if (movies.length > 0) {
    return (
      <main className="min-h-screen flex flex-col gap-12 justify-between items-center p-12">
        <div className="flex items-center justify-between w-full">
          <span className="flex items-center">
            <h2 className="text-4xl font-bold">My movies</h2>
            <Button className="mt-1" variant="ghost" asChild>
              <Link href="/create">
                <PlusCircle size={32} />
              </Link>
            </Button>
          </span>
          <Button className="flex items-center gap-2" variant="ghost">
            Logout
            <SignOut size={32} />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.title} />
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col gap-8 justify-center items-center p-12">
      <h2>No movies found</h2>
      <Button asChild>
        <Link href="/create">Add a new movie</Link>
      </Button>
    </main>
  );
}
