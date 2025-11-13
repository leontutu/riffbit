import * as questionRepository from "../repositories/questionRepository";

/**
 * Service layer for question operations.
 *
 * This module forwards calls to the repository and contains a thin
 * application boundary where additional business logic could live.
 */

/**
 * Retrieve all questions.
 * @returns Promise resolving to an array of questions
 */
export async function getAllQuestions() {
    const questions = await questionRepository.getAllQuestions();
    return questions;
}

/**
 * Get a question by id.
 * @param id - Numeric question id
 * @returns Promise resolving to the question or undefined if not found
 */
export async function getQuestionById(id: number) {
    const question = await questionRepository.getQuestionById(id);
    return question;
}

/**
 * Get a random question.
 * @returns Promise resolving to a single randomly selected question
 */
export async function getRandomQuestion() {
    const question = await questionRepository.getRandomQuestion();
    return question;
}
