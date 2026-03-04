import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEnv() {
  const required = [
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "OPENAI_API_KEY",
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
  ];

  for (const env of required) {
    if (!process.env[env]) {
      console.warn(`Environment variable ${env} is missing!`);
    }
  }
}
