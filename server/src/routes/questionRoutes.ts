import { Application } from "express";

import * as questionRepository from "../repositories/questionRepository";

/**
 * Question API routes module.
 * Registers HTTP endpoints for retrieving questions from the repository.
 */

/**
 * Registers all question-related routes on the Express application.
 * @param app - The Express application instance
 */

export function registerQuestionRoutes(app: Application) {
    app.get("/api/test", (req, res) => {
        res.json({ message: "🚀 Server is running! Responded " + " times" });
    });

    /**
     * Route: GET /api/questions
     * Fetches all questions.
     */
    app.get("/api/questions", async (req, res) => {
        try {
            const questions = await questionRepository.getAllQuestions();
            res.json(questions);
        } catch (error) {
            console.error("Error fetching all questions:", error);
            res.status(500).json({ error: "Failed to retrieve questions" });
        }
    });

    /**
     * Route: GET /api/questions/random
     * Fetches a single random question.
     */
    app.get("/api/questions/random", async (req, res) => {
        try {
            const question = await questionRepository.fetchRandomQuestion();
            res.json(question);
        } catch (error) {
            console.error("Error fetching random question:", error);
            res.status(500).json({ error: "Failed to retrieve random question" });
        }
    });

    /**
     * Route: GET /api/questions/:id
     * Fetches a single question by its ID.
     */
    app.get("/api/questions/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: "Invalid question ID format" });
            }

            const question = await questionRepository.fetchQuestion(id);

            if (question) {
                res.json(question);
            } else {
                res.status(404).json({ error: `Question with ID ${id} not found` });
            }
        } catch (error) {
            console.error(`Error fetching question ${req.params.id}:`, error);
            res.status(500).json({ error: "Failed to retrieve question" });
        }
    });
}
