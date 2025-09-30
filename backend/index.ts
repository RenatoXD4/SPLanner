import { config } from 'dotenv';
config();
import express from "express"; 

import routerProject from "./src/modules/projects/projects.routes.js";
import routerUser from "./src/modules/usuario/user.routes.js";

const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1";

// CORS manual simple
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`🔍 ${req.method} ${req.originalUrl}`);
  next();
});

app.use(`${api}/projects`, routerProject);
app.use(`/${api}/usuarios`, routerUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});