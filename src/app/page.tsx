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
import { PlusCircle } from "@phosphor-icons/react/dist/ssr/PlusCircle";
import Link from "next/link";
import { Movie } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import SignoutButton from "@/components/signout-button";
import { getBaseUrl } from "@/lib/utils";

export default async function Home() {
  async function deleteMovie(id: string) {
    "use server";

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    if (!sessionToken) {
      throw new Error("No session token");
    }

    const response = await fetch(`${getBaseUrl()}/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: `session=${sessionToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }

    revalidatePath("/");
  }

  const cookieStore = await cookies();
  const movies: Movie[] = await fetch(`${getBaseUrl()}/api/movies`, {
    headers: {
      Cookie: `session=${cookieStore.get("session")?.value}`,
    },
  }).then((res) => res.json());
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
          <SignoutButton />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} onDelete={deleteMovie} />
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
      <h2>Your movie list is empty</h2>
      <Button asChild>
        <Link href="/create">Add a new movie</Link>
      </Button>
    </main>
  );
}
