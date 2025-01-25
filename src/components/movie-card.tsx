"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@prisma/client";

export default function MovieCard({
  movie,
  onDelete,
}: {
  movie: Movie;
  onDelete: (id: string) => void;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardContent>
            <div className="w-[266px] h-[400px] overflow-hidden rounded-md">
              <Image
                src={movie.image}
                alt={movie.title}
                width={266}
                height={400}
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-1 pt-1 items-start">
            <CardTitle>{movie.title}</CardTitle>
            <p>{movie.year}</p>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem asChild>
          <Link href={`/edit/${movie.id}`}>Edit</Link>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onDelete(movie.id)}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
