import { pool } from "../db.js";

export const createPlazo = async (productId, plazoData) => {
  const { plazoSemanas, tasaNormal, tasaPuntual } = plazoData;
  const result = await pool.query(
    `
        INSERT INTO plazos (
            producto_id, plazo_semanas, tasa_normal, tasa_puntual
        )
        VALUES ($1, $2, $3, $4)
        RETURNING producto_id, plazo_semanas, tasa_normal, tasa_puntual
    `,
    [productId, plazoSemanas, tasaNormal, tasaPuntual]
  );

  if (result.rowCount === 0) {
    throw {
      status: 500,
      message: "No se pudo crear el plazo",
    };
  }

  const [newPlazo] = result.rows;
  return newPlazo
};


export const getPlazosOfProduct = async (productId) => {
  const result = await pool.query(
    `
    SELECT id, plazo_semanas, producto_id, tasa_normal, tasa_puntual
    FROM plazos
    WHERE producto_id = $1
    ORDER BY plazo_semanas ASC
    `, 
    [productId]
  )

  const plazos = result.rows;
  return plazos;
}
