import { Request, Response } from "express";
import logger from "src/utils/logger";

import * as generationService from "../services/generationService";
import * as questionService from "../services/questionService";

/**
 * Generation controller module.
 * Exposes HTTP handler functions that validate input, call the service layer, and shape HTTP responses.
 */

/**
 * Generate similar question based on a seed question ID from route params.
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise that resolves when the response is sent
 */
export async function generateSimilarQuestion(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid question ID format" });
        }

        const question = await questionService.getQuestionById(id);

        if (!question) {
            res.status(404).json({ error: `Question with ID ${id} not found` });
            return;
        }

        const similarQuestion = await generationService.generateSimilarQuestion(question.text);

        res.json(similarQuestion);
    } catch (error) {
        logger.error({ error }, `Failed to generate question ${req.params.id}`);
        res.status(500).json({ error: "Failed to generate question" });
    }
}

/**
 * Generate follow-up question based on a seed question ID from route params.
 * @param req - Express request object
 * @param res - Express response object
 * @returns Promise that resolves when the response is sent
 */
export async function generateFollowUpQuestion(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid question ID format" });
        }

        const question = await questionService.getQuestionById(id);

        if (!question) {
            res.status(404).json({ error: `Question with ID ${id} not found` });
            return;
        }

        const followUpQuestion = await generationService.generateFollowUpQuestion(question.text);

        res.json(followUpQuestion);
    } catch (error) {
        logger.error({ error }, `Failed to generate question ${req.params.id}`);
        res.status(500).json({ error: "Failed to generate question" });
    }
}
