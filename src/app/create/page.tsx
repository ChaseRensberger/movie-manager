"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, DragEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateMovie() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          year: parseInt(year),
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create movie");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error creating movie:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 p-4">
      <h1>Create a new movie</h1>
      <div className="flex w-full py-24 gap-24 justify-center items-center">
        <div
          className="w-96 h-96 bg-input rounded-md flex flex-col items-center justify-center outline-2 outline-dashed outline-white cursor-pointer relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageDrop}
        >
          {image ? (
            <img
              src={image}
              alt="Movie poster"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <Download size={32} />
              Drop an image here
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
