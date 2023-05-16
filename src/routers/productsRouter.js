import { Router } from "express";
import validate from "../zod/validate.js";
import * as productController from "../controllers/productsController.js";
import * as productSchema from "../schemas/productsSchema.js";
import * as plazosSchemas  from "../schemas/plazosSchemas.js";
import * as plazosController from "../controllers/plazosController.js";

export const productsRouter = Router();

productsRouter.get("/", productController.getAllProducts);
productsRouter.post(
  "/",
  validate(productSchema.createProduct),
  productController.createProduct
);
productsRouter.delete(
  "/:productId",
  validate(productSchema.deleteProduct),
  productController.deleteProduct
);

productsRouter.post(
  "/:productId/plazos",
  validate(plazosSchemas.createPlazo),
  plazosController.createPlazo
);

productsRouter.get(
  "/:productId/plazos",
  plazosController.getPlazosOfProduct
);
