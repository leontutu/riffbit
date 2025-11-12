import cors from "cors";
import express from "express";

import { registerQuestionRoutes } from "./routes/questionRoutes.js";

const app = express();

registerQuestionRoutes(app);

app.use(cors());
app.use(express.json());

export default app;
