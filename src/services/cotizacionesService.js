import { pool } from "../db.js";

const calcularAbono = (precio, tasa, plazo) => (precio / tasa + precio) / plazo;

export const getEstimate = async (productId, plazoEnSemanas /* en semanas */) => {
  const result = await pool.query(
    `
        SELECT plazo_semanas, tasa_normal, tasa_puntual, (SELECT productos.precio FROM productos WHERE productos.id = $1) as precio_producto 
        FROM plazos
        WHERE plazos.producto_id = $1 AND plazos.plazo_semanas = $2
    `,
    [productId, plazoEnSemanas]
  );

  if (result.rowCount === 0) {
    throw {
      status: 404,
      message: `No se pudo acceder al plazo de ${plazoEnSemanas} semanas para el producto con id ${productId}`,
    };
  }

  // obtener los valores necesarios para calcular los abonos
  const [row] = result.rows;
  const { precio_producto, tasa_normal, tasa_puntual, plazo_semanas } = row;

  const response = {
    abonoNormal: calcularAbono(precio_producto, tasa_normal, plazo_semanas),
    abonoPuntual: calcularAbono(precio_producto, tasa_puntual, plazo_semanas),
  };

  return response;
};
