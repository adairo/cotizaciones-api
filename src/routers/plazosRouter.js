import { Router } from "express";
import validate from "../zod/validate.js";
import * as controller from "../controllers/plazosController.js";
import * as schema from "../schemas/plazosSchemas.js";

export const plazosRouter = Router();

plazosRouter.post(
  "/:productId",
  validate(schema.createPlazo),
  controller.createPlazo
);
