import { z } from "zod";

export const reservationSchema = z.object({
  guestName: z.string().min(2, "Nom requis"),
});
