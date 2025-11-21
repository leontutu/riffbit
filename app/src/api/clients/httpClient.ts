import { Platform } from "react-native";

import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { QuestionDTO } from "@shared/types/types";

const DEFAULT_NGROK = process.env.EXPO_PUBLIC_DEFAULT_NGROK || "";
const serverUrl = Platform.OS === "web" ? "http://localhost:3000" : DEFAULT_NGROK;

const apiFetch = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    try {
        const response = await fetch(serverUrl + endpoint, options);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return await response.json();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Request failed: ${message}`);
    }
};

const httpClient = {
    questions: {
        getRandomQuestion: async (): Promise<QuestionDTO> => {
            return apiFetch<QuestionDTO>(API_ENDPOINTS.QUESTIONS.RANDOM);
        },
        getRandomCategorizedQuestion: async (categoryIds: number[]): Promise<QuestionDTO> => {
            return apiFetch<QuestionDTO>(API_ENDPOINTS.QUESTIONS.RANDOM_CATEGORIZED(categoryIds));
        },
    },

    generation: {
        getSimilarQuestion: async (questionId: number): Promise<string> => {
            return apiFetch<string>(API_ENDPOINTS.GENERATION.SIMILAR(questionId), {
                method: "POST",
            });
        },
        getFollowUpQuestion: async (questionId: number): Promise<string> => {
            return apiFetch<string>(API_ENDPOINTS.GENERATION.FOLLOWUP(questionId), {
                method: "POST",
            });
        },
    },
};

export default httpClient;
