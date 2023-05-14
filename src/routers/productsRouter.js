import { Router } from "express";
import * as controller from "../controllers/productsController.js";

export const productsRouter = Router()

productsRouter.get("/", controller.getAllProducts)