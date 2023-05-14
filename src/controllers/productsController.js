import * as service from "../services/productsService.js";

export const getAllProducts = (_req, res) => {
  const products = service.getAllProducts();
  res.status(200).send(products);
};
