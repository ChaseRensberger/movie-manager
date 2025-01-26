"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignIn() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error("Signin failed");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        className="flex flex-col gap-8 w-[300px] items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl">Sign In</h1>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button className="w-full">Sign In</Button>
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
