import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "@phosphor-icons/react/dist/ssr/Download";
import Link from "next/link";
import { useState } from "react";

export default async function EditMovie({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const pageId = (await params).pageId;
  const movie = await fetch(`/api/movies/${pageId}`);
  const movieData = await movie.json();

  const [title, setTitle] = useState(movieData.title);
  const [year, setYear] = useState(movieData.year);
  const [image, setImage] = useState(movieData.image);

  const handleSubmit = async () => {
    const response = await fetch(`/api/movies/${pageId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, year, image }),
    });
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 p-4">
      <h1>Edit movie (ID: {pageId})</h1>
      <div className="flex w-full py-24 gap-24 justify-center items-center">
        <div className="w-96 h-96 bg-input rounded-md flex flex-col items-center justify-center outline-2 outline-dashed outline-white">
          <Download size={32} />
          Drop other image here
        </div>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
