import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";

config();

import blocksRouter from "./src/modules/blocks/blocks.routes.js";
import { KanbanRepository } from "./src/modules/kanban/kanban.repository.js";
import routerKanbantask from "./src/modules/kanban/kanban.routes.js";
import routerMiembro from "./src/modules/miembro/miembro.routes.js";
import routerProject from "./src/modules/projects/projects.routes.js";
import routerUser from "./src/modules/usuario/user.routes.js";


const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1";

//app.use(cors({ credentials: true, origin: true }));   DESCOMENTAR ESTO EN CASO DE FALLO DEL CORS (NO RECOMENDADO EN PRODUCCION)

const allowedOrigins = ["http://localhost:4200", "http://localhost"]; // ANTES DEL CAMBIO --> const allowedOrigins = ["http://localhost:4200/", "http://localhost/"];

// Middleware de CORS (debe ir antes de las rutas)
app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Origen no permitido por CORS: ${origin}`);
      callback(new Error("No permitido por CORS"));
    }
  },
}));

// Middleware para parsear JSON
app.use(express.json());

// Logger básico
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Rutas  
app.use(`/${api}/kanban`, routerKanbantask);
app.use(`/${api}/projects`, routerProject);
//Ruta de login y google auth 
 
app.use(`/${api}/usuarios`, routerUser);
 
app.use(`/${api}`, routerUser);
app.use(`/${api}`, routerMiembro); 
app.use(`/${api}/blocks`, blocksRouter)

// Ruta raíz
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Middleware global de manejo de errores
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
});

async function init(): Promise<void> {
  try {
    const colorRepo: KanbanRepository = new KanbanRepository();
    await colorRepo.createDefaultColorsIfNotExist();
    console.log("Colores por defecto insertados o ya existentes.");
    
    app.listen(port, () => {
      console.log(`Servidor escuchando en puerto ${port}`);
    });
  } catch (error: unknown) {
    console.error("Error inicializando colores por defecto:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

void init();
