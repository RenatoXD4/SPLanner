// Carga las variables definidas en .env

import routerKanbantask from "./src/modules/kanban/kanban.routes.js";
import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";

// Carga las variables definidas en .env
config();

import { prisma } from "./src/lib/prisma.js";
import routerKanbantask from "./src/modules/kanban/kanban.routes.js";
import routerProject from "./src/modules/projects/projects.routes.js";
import routerUser from "./src/modules/usuario/user.routes.js";

const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1";

app.use(express.json());
// Lista de orígenes permitidos, puedes agregar más
//const allowedOrigins = ["http://localhost:4200/" /, otros orígenes si necesitas/];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(`/${api}/kanban`, routerKanbantask);
app.use(`/${api}/projects`, routerProject);
//Ruta de login y google auth 
app.use(`/${api}/usuarios`, routerUser);
app.use(`/${api}`, routerUser);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// CORS manual simple
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware global de manejo de errores (agrega next para manejo correcto)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  const errorMessage =
    err instanceof Error ? err.message :
    typeof err === "string" ? err :
    "Error desconocido";

  res.status(500).json({
    error: errorMessage,
    message: "Error interno del servidor."
  });
  // No necesitas llamar a next() si aquí terminas la respuesta
});


app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
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
