import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "@phosphor-icons/react/dist/ssr/Download";
import Link from "next/link";

export default async function EditMovie({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const pageId = (await params).pageId;
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4">
      <h1>Edit movie (ID: {pageId})</h1>
      <div className="flex w-full py-24 gap-24 justify-center items-center">
        <div className="w-96 h-96 bg-input rounded-md flex flex-col items-center justify-center outline-2 outline-dashed outline-white">
          <Download size={32} />
          Drop other image here
        </div>
        <div className="flex flex-col gap-4">
          <Input placeholder="Title" />
          <Input placeholder="Year" />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button>Update</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
