import { randomBytes, scryptSync } from "crypto";
import { prisma } from "./utils";

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days

export function generateSessionToken(): string {
  const bytes = randomBytes(15);
  return bytes.toString("base64");
}

function saltAndHashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, storedHash] = hashedPassword.split(":");
  const hashToCheck = scryptSync(password, salt, 64).toString("hex");
  return hashToCheck === storedHash;
}

export async function signUp(email: string, password: string) {
  const hashedPassword = saltAndHashPassword(password);
  await prisma.user.create({
    data: { email, password: hashedPassword },
  });
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  const sessionToken = generateSessionToken();
  await prisma.session.create({
    data: {
      token: sessionToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + EXPIRATION_TIME),
    },
  });
  return sessionToken;
}
