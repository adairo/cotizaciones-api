import { z } from "zod";

const stringToNumberSchema = z.string().transform((val) => Number(val));

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
      productId: stringToNumberSchema,
    })
    .strict(),
});

export const updateProduct = z.object({
  params: z
    .object({
      productSku: z
        .string()
        .max(10)
        .regex(/[A-Za-z\d]+/),
    })
    .strict(),
  body: createProduct.shape.body.partial().strict(), // tiene la misma forma que el body para crear un producto
});
