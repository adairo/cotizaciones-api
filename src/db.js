import { Pool } from "pg";
import { config as configEnvironmentVariables } from "dotenv";

configEnvironmentVariables();
// Pg en automático leerá las variables de entorno para conectarse a la base de datos
export const pool = new Pool();
