import { Platform } from "react-native";

import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { Question } from "@shared/types/types";

/**
 * HTTP client for questions API.
 * Handles all network requests to the questions backend endpoints.
 */

const DEFAULT_NGROK = process.env.EXPO_PUBLIC_DEFAULT_NGROK || "";
const serverUrl = Platform.OS === "web" ? "http://localhost:3000" : DEFAULT_NGROK;

/**
 * Shared fetch wrapper for API requests.
 * @param endpoint - API endpoint path (e.g., API_ENDPOINTS.QUESTIONS.RANDOM)
 * @returns Promise resolving to the parsed JSON response
 * @throws Error if the request fails or the server returns a non-OK status
 */
const apiFetch = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await fetch(serverUrl + endpoint);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        return await response.json();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Request failed: ${message}`);
    }
};

const questionsApiClient = {
    /**
     * Fetch a random question from the server.
     * @returns Promise resolving to a random question
     */
    getRandomQuestion: async (): Promise<Question> => {
        return apiFetch<Question>(API_ENDPOINTS.QUESTIONS.RANDOM);
    },
};

export default questionsApiClient;
