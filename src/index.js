import express from "express";
import { productsRouter } from "./routers/productsRouter.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json())
app.use("/api/productos", productsRouter)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
