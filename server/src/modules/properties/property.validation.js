import { z } from "zod";

export const createPropertySchema = z.object({
  name: z.string().min(3, "Nom requis"),

  icalUrl: z.string().url("URL invalide").optional().or(z.literal("")),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nom requis"),

  email: z.string().email("Email invalide"),

  password: z.string().min(6, "Mot de passe minimum 6 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),

  password: z.string().min(6, "Mot de passe requis"),
});
