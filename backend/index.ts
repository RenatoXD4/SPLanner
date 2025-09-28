import express from "express";

import routerProject from "./src/modules/projects/projects.routes.js";

const app = express();
const port = process.env.PORT ?? "9001";
const api = "api-v1"

app.use(express.json())

app.use(`${api}/projects`, routerProject)
app.use(`${api}/usuarios`, routerProject)

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
