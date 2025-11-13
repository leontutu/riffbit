import cors from "cors";
import express from "express";

import { registerHealthRoutes } from "./routes/healthRoutes";
import { registerQuestionRoutes } from "./routes/questionRoutes";

const app = express();
app.use(cors());
app.use(express.json());

registerQuestionRoutes(app);
registerHealthRoutes(app);

export default app;
