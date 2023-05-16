import express from "express"
import validate from "../zod/validate.js"
import * as schema from "../schemas/cotizacionesSchema.js"
import * as controller from "../controllers/cotizacionesController.js"
export const cotizacionesRouter = express.Router()

cotizacionesRouter.get("/:productId/:plazo", validate(schema.getEstimate), controller.getEstimate)
