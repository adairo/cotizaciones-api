import pg from "pg";
const { Pool, types } = pg;
import { config as configEnvironmentVariables } from "dotenv";

// Postgres por defecto regresará el tipo NUMERIC como cadenas
// para proteger de posibles desbordamientos.
// Para este ejercicio asumamos que los precios no serán
// exageradamente largos
types.setTypeParser(types.builtins.NUMERIC, (num) => Number(num));

configEnvironmentVariables();
// Pg en automático leerá las variables de entorno para conectarse a la base de datos
// El objeto pool puede ser reutilizado en toda la aplicación para acceder a la DB
export const pool = new Pool();
