import { z } from "zod";

export const propertySchema = z.object({
  name: z.string().min(3, "Nom obligatoire"),

  icalUrl: z.string().url("URL iCal invalide"),
});
