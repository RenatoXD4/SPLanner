import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors"; // <-- IMPORTAR CORS
import routerProject from "./src/modules/projects/projects.routes.js";

const app = express();
const port = process.env.PORT ?? 9001;
const api = "api-v1";

// ======================= CORS =======================
// Permitir solicitudes desde tu frontend Angular
app.use(cors({
  origin: 'http://localhost:4200',       // Frontend permitido
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use(`/${api}/projects`, routerProject);

// Ruta principal
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Middleware de manejo de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Error interno del servidor" });
});

// Levantar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
