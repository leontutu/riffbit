import { useState } from "react";

import { CATEGORY_TO_CATEGORY_ID, Category } from "@shared/constants/constants";
import { QuestionDTO } from "@shared/types/types";

import httpService from "../api/services/httpService";

/**
 * React hook for fetching random questions by category.
 * Automatically fetches a question on mount and provides a refresh function.
 */

/**
 * Custom hook to fetch and manage random question state.
 * @returns Object containing question data, loading state, error message, and refresh function
 * aswell as category toggles
 */
export const useRandomQuestion = () => {
    const [question, setQuestion] = useState<QuestionDTO | null>(null);
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

    const getRandomQuestion = async () => {
        setIsLoading(true);
        setError(null);

        const selectedCategories = Object.entries(toggles);
        const activeCategoryIds: number[] = [];
        selectedCategories.forEach(category => {
            if (category[1]) {
                activeCategoryIds.push(CATEGORY_TO_CATEGORY_ID.get(category[0] as Category)!);
            }
        });

        if (activeCategoryIds.length === 0) {
            // hack: wait a short moment to allow UI to update before setting error
            await new Promise(resolve => setTimeout(resolve, 50));
            setError("Please select at least one category.");
            setQuestion(null);
            setIsLoading(false);
            return;
        }

        try {
            const questionData =
                await httpService.questions.getRandomCategorizedQuestion(activeCategoryIds);
            setQuestion(questionData);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Oops! Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { toggles, setToggles, question, isLoading, error, refresh: getRandomQuestion };
};
