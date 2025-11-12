import { Application } from "express";

/**
 * Health API routes module.
 * Registers HTTP endpoints for health checks.
 */

/**
 * Registers all health-related routes on the Express application.
 * @param app - The Express application instance
 */
export function registerHealthRoutes(app: Application) {
    app.get("/health", (req, res) => {
        res.json({ message: "🚀 Server is running" });
    });
}
