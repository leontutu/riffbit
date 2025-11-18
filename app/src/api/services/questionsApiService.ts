import { QuestionDTO } from "@shared/types/types";

import questionsApiClient from "../clients/questionsApiClient";

/**
 * Service layer for questions API.
 * Provides a boundary where business logic, caching, or transformations could live.
 * Has little value at the moment but doesn't have any real maintenance cost so far either.
 */

const questionsApiService = {
    /**
     * Retrieve a random question.
     * @returns Promise resolving to a random question
     */
    getRandomQuestion: async (): Promise<QuestionDTO> => {
        return await questionsApiClient.getRandomQuestion();
    },

    /**
     * Retrieve a random question that matches at least one of the provided category IDs.
     * @param categoryIds - Array of category IDs to filter questions by
     * @returns Promise resolving to a random question
     */
    getRandomCategorizedQuestion: async (categoryIds: number[]): Promise<QuestionDTO> => {
        return await questionsApiClient.getRandomCategorizedQuestion(categoryIds);
    },
};

export default questionsApiService;
