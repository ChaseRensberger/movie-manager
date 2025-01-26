import { randomBytes, scryptSync } from "crypto";
import { z } from "zod";

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export function generateSessionToken(): string {
  const bytes = randomBytes(15);
  return bytes.toString("base64");
}

export function saltAndHashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(
  password: string,
  hashedPassword: string
): boolean {
  const [salt, storedHash] = hashedPassword.split(":");
  const hashToCheck = scryptSync(password, salt, 64).toString("hex");
  return hashToCheck === storedHash;
}
