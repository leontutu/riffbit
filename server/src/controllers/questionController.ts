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

/**
 *
 * Fetch and return a single randomly selected question filtered by category IDs.
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise that resolves when the response is sent
 */
export async function getRandomQuestionWithCategories(req: Request, res: Response) {
    try {
        const categoryIdsParam = req.query.categoryIds;
        if (!categoryIdsParam || typeof categoryIdsParam !== "string") {
            return res.status(400).json({ error: "categoryIds query parameter is required" });
        }
        const categoryIds = categoryIdsParam
            .split(",")
            .map(idStr => parseInt(idStr, 10))
            .filter(id => !isNaN(id));

        if (categoryIds.length === 0) {
            return res
                .status(400)
                .json({ error: "At least one valid category ID must be provided" });
        }
        const question = await questionService.getRandomQuestionWithCategories(categoryIds);
        res.json(question);
    } catch (error) {
        logger.error({ error }, "Failed to fetch random question with categories");
        res.status(500).json({ error: "Failed to fetch random question with categories" });
    }
}
