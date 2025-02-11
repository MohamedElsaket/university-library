import { desc } from "drizzle-orm";
import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(6),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const bookSchema = z.object({
  title: z.string().trim().min(3).max(100),
  author: z.string().trim().min(3).max(100),
  genre: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(500),
  rating: z.coerce.number().int().min(1).max(5),
  totalCopies: z.coerce.number().positive().int().lte(10000),
  coverUrl: z.string().nonempty(),
  videoUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  summary: z.string().trim().min(10).max(500),
});
