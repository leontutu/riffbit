import { NextFunction, Request, Response } from "express";

import ValidationError from "../errors/ValidationError";
import * as questionService from "../services/questionService";

/**
 * Question controller module.
 * Exposes HTTP handler functions that validate input, call the service layer, and shape HTTP responses.
 */

/**
 * Fetch and return all questions.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 * @returns Promise that resolves when the response is sent
 */
export async function getAllQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const questions = await questionService.getAllQuestions();
        res.json(questions);
    } catch (error) {
        next(error);
    }
}

/**
 * Fetch a specific question by ID from route params.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 * @returns Promise that resolves when the response is sent
 */
export async function getQuestionById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new ValidationError("Invalid question ID format", "id");
        }
        const question = await questionService.getQuestionById(id);
        res.json(question);
    } catch (error) {
        next(error);
    }
}

/**
 * Fetch and return a single randomly selected question.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 * @returns Promise that resolves when the response is sent
 */
export async function getRandomQuestion(req: Request, res: Response, next: NextFunction) {
    try {
        const question = await questionService.getRandomQuestion();
        res.json(question);
    } catch (error) {
        next(error);
    }
}

/**
 *
 * Fetch and return a single randomly selected question filtered by category IDs.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function for error handling
 * @returns Promise that resolves when the response is sent
 */
export async function getRandomQuestionWithCategories(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const categoryIdsParam = req.query.categoryIds;
        if (!categoryIdsParam || typeof categoryIdsParam !== "string") {
            throw new ValidationError("categoryIds query parameter is required", "categoryIds");
        }
        const categoryIds = categoryIdsParam
            .split(",")
            .map(idStr => parseInt(idStr, 10))
            .filter(id => !isNaN(id));

        if (categoryIds.length === 0) {
            throw new ValidationError(
                "At least one valid category ID must be provided",
                "categoryIds"
            );
        }
        const question = await questionService.getRandomQuestionWithCategories(categoryIds);
        res.json(question);
    } catch (error) {
        next(error);
    }
}
