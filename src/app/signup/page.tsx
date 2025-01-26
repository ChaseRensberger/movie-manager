"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      const error = await response.json();
      setError(error.message || "Failed to sign up");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        className="flex flex-col gap-8 w-[300px] items-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl">Sign Up</h1>
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button className="w-full">Sign Up</Button>
        <p>
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
