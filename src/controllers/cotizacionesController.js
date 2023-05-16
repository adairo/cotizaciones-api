import * as service from "../services/cotizacionesService.js";

export const getEstimate = async (req, res) => {
  const { productId, plazo } = req.params;
  try {
    const estimate = await service.getEstimate(productId, plazo);
    res.status(200).send(estimate);
  } catch (error) {
    res.status(error.status ?? 500).send({ error: error.message ?? "Hubo un problema al conectarse con la base de datos" });
  }
};
