import cors from "cors";
import express from "express";

import { registerHealthRoutes } from "./routes/healthRoutes";
import { registerQuestionRoutes } from "./routes/questionRoutes";
import logger from "./utils/logger";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        logger.info({
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: Date.now() - start,
        });
    });
    next();
});

registerQuestionRoutes(app);
registerHealthRoutes(app);

export default app;
