import cors from "cors";
import express from "express";

import { registerHealthRoutes } from "./routes/healthRoutes";
import { registerQuestionRoutes } from "./routes/questionRoutes";

const app = express();

registerQuestionRoutes(app);
registerHealthRoutes(app);

app.use(cors());
app.use(express.json());

export default app;
