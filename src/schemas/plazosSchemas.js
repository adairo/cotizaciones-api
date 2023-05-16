import { z } from "zod";

const stringToNumber = z.string().transform((val) => Number(val));

export const createPlazo = z.object({
  params: z.object({
    productId: stringToNumber, // params is always a string
  }),
  body: z
    .object({
      plazoSemanas: z.number(),
      tasaNormal: z.number(),
      tasaPuntual: z.number(),
    })
    .strict(),
});
