import { NextFunction, Request, Response } from "express";
import QuestionNotFoundError from "src/errors/QuestionNotFoundError";
import ValidationError from "src/errors/ValidationError";
import logger from "src/utils/logger";

/**
 * Centralized error handling middleware.
 * Maps custom errors to appropriate HTTP responses and logs unhandled errors.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof QuestionNotFoundError) {
        return res.status(err.status).json({ error: err.message });
    }

    if (err instanceof ValidationError) {
        return res.status(err.status).json({ error: err.message });
    }

    logger.error(
        {
            error: err,
            stack: err.stack,
        },
        `Unhandled error processing ${req.method} ${req.path}`
    );
    res.status(500).json({ error: "Internal Server Error" });
}
