import express from "express";
import { productsRouter } from "./routers/productsRouter.js";
import { plazosRouter } from "./routers/plazosRouter.js";


const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json())
app.use("/api/productos", productsRouter)
app.use("/api/plazos", plazosRouter)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});