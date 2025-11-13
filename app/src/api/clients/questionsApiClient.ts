import { Platform } from "react-native";

import { Question } from "@shared/types";

/**
 * HTTP client for questions API.
 * Handles all network requests to the questions backend endpoints.
 */

const DEFAULT_NGROK = process.env.EXPO_PUBLIC_DEFAULT_NGROK || "";
const serverUrl = Platform.OS === "web" ? "http://localhost:3000" : DEFAULT_NGROK;

/**
 * Shared fetch wrapper for API requests.
 * @param endpoint - API endpoint path (e.g., "/api/questions/random")
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
        return apiFetch<Question>("/api/questions/random");
    },
};

export default questionsApiClient;
