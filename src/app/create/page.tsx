"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "@phosphor-icons/react";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4">
      <h1>Create a new movie</h1>
      <div className="flex w-full py-24 gap-24 justify-center items-center">
        <div className="w-96 h-96 bg-input rounded-md flex flex-col items-center justify-center outline-2 outline-dashed outline-white">
          <Download size={32} />
          Drop an image here
        </div>
        <div className="flex flex-col gap-4">
          <Input placeholder="Title" />
          <Input placeholder="Year" />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
