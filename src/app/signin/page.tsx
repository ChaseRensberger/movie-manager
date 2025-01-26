import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <form className="flex flex-col gap-8 w-[300px] items-center">
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
