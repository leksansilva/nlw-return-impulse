import express from "express";
import { routes } from "./routes";
import cors from "cors";

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log("back-end rodando na porta ---> http://localhost:" + port);
});
