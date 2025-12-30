import { z } from "zod";

export const searchSchema = z.object({
  query: z
    .string()
    .min(2, "Введите минимум 2 символа"),
});
