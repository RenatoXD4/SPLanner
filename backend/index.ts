import express from "express";

import { prisma } from "./src/lib/prisma.js"; // ajusta la ruta según tu proyecto
import routerKanbantask from "./src/modules/kanban/kanban.routes.js";
import routerProject from "./src/modules/projects/projects.routes.js";

const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1";

app.use(express.json());

// Montaje de routers
app.use(`/${api}/kanban`, routerKanbantask);
app.use(`/${api}/projects`, routerProject);
app.use(`/${api}/usuarios`, routerProject);

// Logs para confirmar rutas
console.log(`API base path: /${api}`);
console.log("Kanban routes mounted at:", `/${api}/kanban`);
console.log("Projects routes mounted at:", `/${api}/projects`);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});


                      //// ELIMINAR DE SER NECESARIO
// Ruta para testear conexión a la BD
app.get("/test-db", async (req, res) => {
  try {
    // Simple consulta para validar conexión
    const usuarios = await prisma.usuario.findMany({ take: 1 });
    res.status(200).json({
      message: "Conexión a la base de datos exitosa.",
      usuarios,
    });
  } catch (error) {
    console.error("Error conectando a la base de datos:", error);
    res.status(500).json({

      error: error,
      message: "Error conectando a la base de datos.",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
