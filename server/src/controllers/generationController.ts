import { NextFunction, Request, Response } from "express";

import ValidationError from "../errors/ValidationError";
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
 * @param next - Express next function for error handling
 * @returns Promise that resolves when the response is sent
 */
export async function generateSimilarQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new ValidationError("Invalid question ID format", "id");
        }

        const question = await questionService.getQuestionById(id);
        const similarQuestion = await generationService.generateSimilarQuestion(question.text);

        res.json(similarQuestion);
    } catch (error) {
        next(error);
    }
}

/**
 * Generate follow-up question based on a seed question ID from route params.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 * @returns Promise that resolves when the response is sent
 */
export async function generateFollowUpQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new ValidationError("Invalid question ID format", "id");
        }

        const question = await questionService.getQuestionById(id);
        const followUpQuestion = await generationService.generateFollowUpQuestion(question.text);

        res.json(followUpQuestion);
    } catch (error) {
        next(error);
    }
}
