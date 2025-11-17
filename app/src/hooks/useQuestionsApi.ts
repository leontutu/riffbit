import { useState } from "react";

import { Question } from "@shared/types/types";

import questionsApiService from "../api/services/questionsApiService";

/**
 * React hook for fetching random questions.
 * Automatically fetches a question on mount and provides a refresh function.
 */

/**
 * Custom hook to fetch and manage random question state.
 * @returns Object containing question data, loading state, error message, and refresh function
 */
export const useRandomQuestion = () => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getRandomQuestion = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const questionData = await questionsApiService.getRandomQuestion();
            setQuestion(questionData);
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : "Oops! Something went wrong.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     getRandomQuestion();
    // }, []);

    return { question, isLoading, error, refresh: getRandomQuestion };
};
