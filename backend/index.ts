import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Request, Response } from "express";

import routerProject from "./src/modules/projects/projects.routes.js";

const app = express();
const port = process.env.PORT ?? 9001;
const api = "api-v1";

// Configuración de CORS
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: "http://localhost:4200",
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas del proyecto
app.use(`/${api}/projects`, routerProject);

// Ruta raíz
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Middleware de manejo de errores
app.use((err: Error & { status?: number }, _req: Request, res: Response) => {
  console.error(err);

  res.status(err.status ?? 500).json({
    message: err.message, // ya no usamos ?? porque siempre existe
  });
});

// Levantar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
