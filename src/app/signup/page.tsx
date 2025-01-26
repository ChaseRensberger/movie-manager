"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signUp } from "@/lib/auth";
import { useActionState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [state, action, pending] = useActionState(signUp, undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form
        className="flex flex-col gap-8 w-[300px] items-center"
        action={action}
      >
        <h1 className="text-2xl">Sign Up</h1>
        <Input placeholder="Email" />
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <Input placeholder="Password" />
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Button className="w-full" disabled={pending}>
          Sign Up
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
