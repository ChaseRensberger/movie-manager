import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export { prisma, cn, getBaseUrl };
