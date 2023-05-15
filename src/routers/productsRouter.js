import { Router } from "express";
import validate from "../zod/validate.js";
import * as controller from "../controllers/productsController.js";
import * as schema from "../schemas/userSchemas.js";

export const productsRouter = Router();


productsRouter.get("/", controller.getAllProducts);
productsRouter.post(
  "/",
  validate(schema.createProduct),
  controller.createProduct
);
productsRouter.delete("/:productId", validate(schema.deleteProduct), controller.deleteProduct)
