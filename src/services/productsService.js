import { pool } from "../db.js";

export const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT id, sku, nombre, precio 
    FROM productos`
  );

  return result.rows;
};

export const createProduct = async ({ sku, nombre, precio }) => {
  const result = await pool.query(
    `INSERT INTO productos (sku, nombre, precio) 
    VALUES ($1, $2, $3)
    RETURNING id, sku, nombre, precio`,
    [sku, nombre, precio]
  );

  if (result.rowCount === 0) {
    throw {
      status: 500,
      message: `No fue posible insertar el producto`,
    };
  }

  const [product] = result.rows;

  return product;
};

export const deleteProduct = async (productId) => {
  const result = await pool.query(
    `DELETE FROM productos
    WHERE productos.id = $1
    RETURNING id, sku, nombre, precio`,
    [productId]
  );

  if (result.rowCount === 0) {
    throw {
      status: 404,
      message: `No fue posible eliminar el producto con id ${productId}`,
    };
  }

  const [removedProduct] = result.rows;
  return removedProduct;
};

export const updateProduct = async (productSku, data) => {
  const result = await pool.query(
    `
    UPDATE productos
    SET 
      sku = COALESCE($1, sku),
      nombre = COALESCE($2, nombre),
      precio = COALESCE($3, precio)
    WHERE sku = $4
    RETURNING sku, nombre, precio
  `,
    [data.sku, data.nombre, data.precio, productSku]
  );

  if (result.rowCount === 0) {
    throw {
      status: 404,
      message: "No se pudo actualizar el producto con sku " + productSku,
    };
  }

  const [row] = result.rows;
  return row
};
