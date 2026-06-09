import { z } from "zod";

export const createReservationSchema = z.object({
  title: z.string().min(2, "Titre requis"),

  startDate: z.string(),

  endDate: z.string(),

  source: z.enum(["DIRECT", "AIRBNB", "BLOCKED"]),

  propertyId: z.string(),
});
