import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { QuestionDTO } from "@shared/types/types";

import httpClient from "./httpClient";

global.fetch = jest.fn();

const mockedFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("httpClient", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getRandomQuestion", () => {
        test("returns a question on successful fetch", async () => {
            const mockQuestion: QuestionDTO = { id: 1, text: "Test question", categoryIds: [1, 2] };
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockQuestion),
            } as unknown as Response;

            mockedFetch.mockResolvedValue(mockResponse);

            const result = await httpClient.questions.getRandomQuestion();

            expect(result).toEqual(mockQuestion);
            expect(mockedFetch).toHaveBeenCalledWith(
                expect.stringContaining(API_ENDPOINTS.QUESTIONS.RANDOM),
                undefined
            );
        });

        test("throws error when server returns non-OK status", async () => {
            const mockResponse = {
                ok: false,
                status: 404,
            } as Response;

            mockedFetch.mockResolvedValue(mockResponse);

            await expect(httpClient.questions.getRandomQuestion()).rejects.toThrow(
                "Server error: 404"
            );
        });

        test("throws error when fetch fails", async () => {
            mockedFetch.mockRejectedValue(new Error("Network failure"));

            await expect(httpClient.questions.getRandomQuestion()).rejects.toThrow(
                "Request failed: Network failure"
            );
        });
    });

    describe("getSimilarQuestion", () => {
        test("returns a question on successful fetch", async () => {
            const mockQuestion: string = "Test similar question?";
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockQuestion),
            } as unknown as Response;

            mockedFetch.mockResolvedValue(mockResponse);

            const result = await httpClient.generation.getSimilarQuestion(1);

            expect(result).toEqual(mockQuestion);
            expect(mockedFetch).toHaveBeenCalledWith(
                expect.stringContaining(API_ENDPOINTS.GENERATION.SIMILAR(1)),
                { method: "POST" }
            );
        });
    });
});
