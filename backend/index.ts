// backend/index.ts
import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";

config();

import routerDashboard from "./src/modules/dashboard/dashboard.routes.js";
import aiRouter from "./src/modules/ai-text-editor/ai.routes.js";
import blocksRouter from "./src/modules/blocks/blocks.routes.js";
import { KanbanRepository } from "./src/modules/kanban/kanban.repository.js";
import routerKanbantask from "./src/modules/kanban/kanban.routes.js";
import routerMiembro from "./src/modules/miembro/miembro.routes.js";
import routerProject from "./src/modules/projects/projects.routes.js";
import routerUser from "./src/modules/usuario/user.routes.js"; 
// ✅ INTEGRAR NOTIFICACIONES MEJORADAS
import notificacionRoutes from "./src/modules/notificacion/noti.routes.js";

const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1";

const allowedOrigins = ["http://localhost:4200", "http://localhost"];

// Middleware de CORS
app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Origen no permitido por CORS: ${origin}`);
      callback(new Error("No permitido por CORS"));
    }
  },
}));

app.use(express.json());

// Logger mejorado
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`🌐 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

// Rutas
app.use(`/${api}/kanban`, routerKanbantask);
app.use(`/${api}/projects`, routerProject);
app.use(`/${api}/usuarios`, routerUser);
app.use(`/${api}`, routerUser);
app.use(`/${api}`, routerMiembro); 
app.use(`/${api}`, routerDashboard); 
app.use(`/${api}/blocks`, blocksRouter);
app.use(`/${api}/ai`, aiRouter);
// ✅ INTEGRAR RUTAS DE NOTIFICACIONES MEJORADAS
app.use(`/${api}/notificaciones`, notificacionRoutes);

// Ruta raíz
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "SPLanner API Server", 
    version: "1.0.0",
    modules: ["usuarios", "proyectos", "tareas", "notificaciones", "kanban"]
  });
});

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Middleware global de manejo de errores
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error del servidor:", err);
  
  const errorMessage = err instanceof Error 
    ? err.message 
    : typeof err === "string" 
      ? err 
      : "Error desconocido";

  res.status(500).json({
    error: errorMessage,
    message: "Error interno del servidor.",
    path: req.originalUrl
  });
});

// Middleware para rutas no encontradas (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    message: `La ruta ${req.method} ${req.originalUrl} no existe`,
    availableRoutes: [
      `GET /${api}/notificaciones`,
      `POST /${api}/notificaciones/automaticas/edicion-proyecto`,
      `POST /${api}/notificaciones/automaticas/edicion-tarea`,
      `POST /${api}/notificaciones/automaticas/comentario-tarea`,
      `POST /${api}/notificaciones/automaticas/cambio-estado`,
      `POST /${api}/notificaciones/automaticas/asignacion-tarea`,
      `POST /${api}/notificaciones/automaticas/cambio-responsable`,
      `POST /${api}/notificaciones/automaticas/eliminacion-tarea`,
      `POST /${api}/notificaciones/automaticas/subida-archivo`
    ]
  });
});

async function init(): Promise<void> {
  try {
    const colorRepo: KanbanRepository = new KanbanRepository();
    await colorRepo.createDefaultColorsIfNotExist();
    console.log("🎨 Colores por defecto insertados o ya existentes.");
    
    app.listen(port, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
      console.log(`📊 API disponible en http://localhost:${port}/${api}`);
      console.log(`🔔 Módulo de notificaciones: http://localhost:${port}/${api}/notificaciones`);
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    console.error("❌ Error inicializando colores por defecto:", errorMessage);
    process.exit(1);
  }
}

void init();