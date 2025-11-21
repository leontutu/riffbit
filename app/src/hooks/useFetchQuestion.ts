import { useState } from "react";

import { CATEGORY_TO_CATEGORY_ID, Category } from "@shared/constants/constants";

import httpService from "../api/services/httpService";

/**
 * React hook for fetching questions from the server API.
 */

type QuestionSource = "random" | "similar" | "followup";

/**
 * Custom hook to fetch and manage question state.
 * @returns Object containing question data, loading state, error message, and refresh function
 * aswell as category toggles
 */
export const useFetchQuestion = () => {
    const [questionText, setQuestionText] = useState<string | null>(null);
    const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [toggles, setToggles] = useState({
        [Category.PHILOSOPHY]: true,
        [Category.ROMANCE]: true,
        [Category.DILEMMA]: true,
        [Category.FANTASY]: true,
        [Category.REFLECTION]: true,
        [Category.MEMORIES]: true,
        [Category.FUN]: true,
        [Category.SECRETS]: true,
    });

    const fetchQuestion = async (source: QuestionSource) => {
        setIsLoading(true);
        setError(null);

        try {
            if (source === "random") {
                const activeCategoryIds: number[] = [];
                Object.entries(toggles).forEach(([category, isActive]) => {
                    if (isActive) {
                        activeCategoryIds.push(CATEGORY_TO_CATEGORY_ID.get(category as Category)!);
                    }
                });

                if (activeCategoryIds.length === 0) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                    setError("Please select at least one category.");
                    setQuestionText(null);
                    setIsLoading(false);
                    return;
                }

                const questionData =
                    await httpService.questions.getRandomCategorizedQuestion(activeCategoryIds);
                setQuestionText(questionData.text);
                setCurrentQuestionId(questionData.id);
            } else {
                if (!currentQuestionId) {
                    setError("No question to generate from");
                    setIsLoading(false);
                    return;
                }

                const generatedText =
                    source === "similar"
                        ? await httpService.generation.getSimilarQuestion(currentQuestionId)
                        : await httpService.generation.getFollowUpQuestion(currentQuestionId);

                setQuestionText(generatedText);
            }
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Oops! Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        currentQuestionId,
        questionText,
        isLoading,
        error,
        toggles,
        setToggles,
        fetchRandom: () => fetchQuestion("random"),
        fetchSimilar: () => fetchQuestion("similar"),
        fetchFollowUp: () => fetchQuestion("followup"),
    };
};
