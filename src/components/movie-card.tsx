import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Movie {
  title: string;
  year: string;
  image: string;
}

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
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
  );
}
