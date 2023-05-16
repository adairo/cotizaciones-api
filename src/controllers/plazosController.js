import * as service from "../services/plazosService.js";

export const createPlazo = async (req, res) => {
  const { productId } = req.params;
  const plazoData = req.body;

  try {
    const newPlazo = await service.createPlazo(productId, plazoData);
    res.status(201).send(newPlazo);
  } catch (error) {
    res.status(error.status ?? 500).send({ error: error.message });
  }
};

export const getPlazosOfProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const plazos = await service.getPlazosOfProduct(productId);
    res.status(200).send(plazos);
  } catch (error) {
    res.status(error.status ?? 500).send({ error: error.message });
  }
};
