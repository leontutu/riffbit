import * as openAiApiClient from "../external/openAIApiClient";

/**
 * Service layer for Generation operations.
 *
 * This module provides functions to interact with the generation client.
 * The generation client will eventually be refactored into its own microservice.
 */

/**
 * Generate similar question a seed question.
 * @returns Promise resolving to a question
 */
export async function generateSimilarQuestion(questionText: string) {
    const similarQuestion = await openAiApiClient.generateSimilarQuestion(questionText);
    return similarQuestion;
}

/**
 * Generate follow-up question a seed question.
 * @returns Promise resolving to a question
 */
export async function generateFollowUpQuestion(questionText: string) {
    const followUpQuestion = await openAiApiClient.generateFollowUpQuestion(questionText);
    return followUpQuestion;
}
