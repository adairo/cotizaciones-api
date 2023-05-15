import { z } from "zod";

export const createProduct = z.object({
  body: z
    .object({
      sku: z
        .string({ required_error: "Debes proporcionar el SKU del producto" })
        .max(10),
      nombre: z
        .string({ required_error: "Debes proporcionar el nombre del producto" })
        .max(50),
      precio: z
        .number({ required_error: "Debes proporcionar el precio del producto" })
        .gte(0),
    })
    .strict(),
});

export const deleteProduct = z.object({
  params: z
    .object({
      productId: z.string().transform(val => Number(val))
    })
    .strict(),
});
