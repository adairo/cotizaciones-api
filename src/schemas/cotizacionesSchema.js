import { z } from "zod";

const stringToNumber = z.string().transform((val) => Number(val));

export const getEstimate = z.object({
  params: z.object({
    productId: stringToNumber,
    plazo: stringToNumber
  }),
});

