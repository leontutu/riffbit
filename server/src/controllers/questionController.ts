import { Request, Response } from "express";
import logger from "src/utils/logger";

import * as questionService from "../services/questionService";

/**
 * Question controller module.
 * Exposes HTTP handler functions that validate input, call the service layer, and shape HTTP responses.
 */

/**
 * Fetch and return all questions.
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise that resolves when the response is sent
 */
export async function getAllQuestions(req: Request, res: Response) {
    try {
        const questions = await questionService.getAllQuestions();
        res.json(questions);
    } catch (error) {
        logger.error({ error }, "Failed to fetch all questions");
        res.status(500).json({ error: "Failed to retrieve questions" });
    }
}

/**
 * Fetch a specific question by ID from route params.
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise that resolves when the response is sent
 */
export async function getQuestionById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid question ID format" });
        }

        const question = await questionService.getQuestionById(id);

        if (question) {
            res.json(question);
        } else {
            res.status(404).json({ error: `Question with ID ${id} not found` });
        }
    } catch (error) {
        logger.error({ error }, `Failed to fetch question with ID ${req.params.id}`);
        res.status(500).json({ error: "Failed to fetch question" });
    }
}

/**
 * Fetch and return a single randomly selected question.
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise that resolves when the response is sent
 */
export async function getRandomQuestion(req: Request, res: Response) {
    try {
        const question = await questionService.getRandomQuestion();
        res.json(question);
    } catch (error) {
        logger.error({ error }, "Failed to fetch random question");
        res.status(500).json({ error: "Failed to fetch random question" });
    }
}
