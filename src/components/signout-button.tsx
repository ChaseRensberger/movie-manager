"use client";

import { Button } from "@/components/ui/button";
import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button
      className="flex items-center gap-2"
      variant="ghost"
      onClick={handleSignOut}
    >
      Sign out
      <SignOut size={32} />
    </Button>
  );
}
