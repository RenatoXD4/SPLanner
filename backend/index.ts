import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import routerProject from "./src/modules/projects/projects.routes.js";

const app = express();
const port = process.env.PORT ?? 9001;
const api = "api-v1";

app.use(express.json());
app.use(`/${api}/projects`, routerProject);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Error interno del servidor" });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
