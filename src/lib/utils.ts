import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { prisma, cn };
