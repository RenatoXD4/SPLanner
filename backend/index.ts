import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";

// Carga las variables definidas en .env
config();

import { prisma } from "./src/lib/prisma.js";
import routerKanbantask from "./src/modules/kanban/kanban.routes.js";
import routerProject from "./src/modules/projects/projects.routes.js";

const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1";

// Lista de orígenes permitidos, puedes agregar más
const allowedOrigins = ["http://localhost:4200" /*, otros orígenes si necesitas */];

// Configuración dinámica de CORS para múltiples orígenes

app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  origin: function (origin, callback) {

    if (!origin) { callback(null, true); return; }

    if (allowedOrigins.includes(origin)) {

      callback(null, true);
    } else {

      console.warn(`CORS - Origen no permitido: ${origin}`);

      callback(null, false);
    }
  },
}));

// Obtener todas las tareas
app.get('/api-v1/kanban', async (req, res) => {
  try {
    const tareas = await prisma.tarea.findMany();
    res.status(200).json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error interno al obtener tareas' });
  }
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(`/${api}/kanban`, routerKanbantask);
app.use(`/${api}/projects`, routerProject);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
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



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/${api}`);
});
