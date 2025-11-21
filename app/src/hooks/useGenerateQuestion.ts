/**
 * ALTERNATIVE IMPLEMENTATION - NOT CURRENTLY USED
 *
 * This hook provides a separate interface for question generation
 * as an alternative to the unified useFetchQuestion approach.
 *
 * Currently unused. If we need to split question fetching and
 * generation into separate concerns, this can serve as a starting point.
 *
 * See useFetchQuestion.ts for the current unified implementation.
 */
import { useState } from "react";

import httpService from "../api/services/httpService";

type GenerationType = "similar" | "followup";

export const useGenerateQuestion = () => {
    const [generatedQuestion, setGeneratedQuestion] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [generationError, setGenerationError] = useState<string | null>(null);

    const generate = async (questionId: number, type: GenerationType) => {
        setIsGenerating(true);
        setGenerationError(null);

        try {
            const result =
                type === "similar"
                    ? await httpService.generation.getSimilarQuestion(questionId)
                    : await httpService.generation.getFollowUpQuestion(questionId);
            setGeneratedQuestion(result);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Failed to generate question.";
            setGenerationError(message);
        } finally {
            setIsGenerating(false);
        }
    };

    return { generatedQuestion, isGenerating, generationError, generate };
};
