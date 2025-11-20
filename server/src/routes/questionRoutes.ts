import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { Application } from "express";

import * as questionController from "../controllers/questionController";

/**
 * Question API routes module.
 * Registers HTTP endpoints for retrieving questions from the repository.
 */

/**
 * Registers all question-related routes on the Express application.
 * @param app - The Express application instance
 */
export function registerQuestionRoutes(app: Application) {
    /**
     * Route: GET /api/questions
     * Fetches all questions.
     */
    app.get(API_ENDPOINTS.QUESTIONS.ALL, async (req, res) => {
        await questionController.getAllQuestions(req, res);
    });

    /**
     * Route: GET /api/questions/random
     * Fetches a single random question.
     */
    app.get(API_ENDPOINTS.QUESTIONS.RANDOM, async (req, res) => {
        await questionController.getRandomQuestion(req, res);
    });

    /**
     * Route: GET /api/questions/random-categorized?categoryIds=:categoryIds
     * Fetches a single random question filtered by category IDs.
     */
    app.get(API_ENDPOINTS.QUESTIONS.RANDOM_CATEGORIZED_TEMPLATE, async (req, res) => {
        await questionController.getRandomQuestionWithCategories(req, res);
    });

    /**
     * Route: GET /api/questions/:id
     * Fetches a single question by its ID.
     */
    app.get(API_ENDPOINTS.QUESTIONS.BY_ID_TEMPLATE, async (req, res) => {
        await questionController.getQuestionById(req, res);
    });
}
