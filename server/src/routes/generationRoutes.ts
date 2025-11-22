import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { Application } from "express";

import * as generationController from "../controllers/generationController";

// import * as questionController from "../controllers/questionController";

/**
 * Generation API routes module.
 * Registers HTTP endpoints for retrieving questions from the repository.
 */

/**
 * Registers all generation-related routes on the Express application.
 * @param app - The Express application instance
 */
export function registerGenerationRoutes(app: Application) {
    /**
     * Route: POST /api/generation/similar/:id
     * Generates similar questions based on a given question ID.
     */
    app.post(
        API_ENDPOINTS.GENERATION.SIMILAR_TEMPLATE,
        generationController.generateSimilarQuestion
    );

    /**
     * Route: POST /api/generation/followup/:id
     * Generates follow-up questions based on a given question ID.
     */
    app.post(
        API_ENDPOINTS.GENERATION.FOLLOWUP_TEMPLATE,
        generationController.generateFollowUpQuestion
    );
}
