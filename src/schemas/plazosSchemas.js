import { z } from "zod";

const stringToNumber = z.string().transform((val) => Number(val));

const productIdParameter = z.object({
  productId: stringToNumber, // params is always a string
});

export const createPlazo = z.object({
  params: productIdParameter,
  body: z
    .object({
      plazoSemanas: z.number(),
      tasaNormal: z.number(),
      tasaPuntual: z.number(),
    })
    .strict(), // strict mode doesn't allow unknown keys
});

export const getPlazosOfProduct = z.object({
  params: productIdParameter,
});
