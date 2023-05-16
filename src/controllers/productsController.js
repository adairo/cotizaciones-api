import * as service from "../services/productsService.js";

export const getAllProducts = async (_req, res) => {
  try {
    const products = await service.getAllProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(error.status ?? 500).send({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const productData = req.body;
  try {
    const createdProduct = await service.createProduct(productData);
    res.status(201).send(createdProduct);
  } catch (error) {
    res.status(error.status ?? 500).send({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const removedProduct = await service.deleteProduct(productId);
    res.status(202).send(removedProduct);
  } catch (error) {
    res.status(error.status ?? 500).send({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { productSku } = req.params;
  const productData = req.body;

  try {
    const newProduct = await service.updateProduct(productSku, productData);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(error.status ?? 500).send({error: error.message})
  }
};
