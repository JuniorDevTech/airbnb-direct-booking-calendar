import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nom requis"),

  email: z.email("Email invalide"),

  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
});

export const loginSchema = z.object({
  email: z.email("Email invalide"),

  password: z.string().min(6),
});
