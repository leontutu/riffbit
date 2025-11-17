import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { QuestionDTO } from "@shared/types/types";

import questionsApiClient from "./questionsApiClient";

global.fetch = jest.fn();

const mockedFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("questionsApiClient", () => {
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

            const result = await questionsApiClient.getRandomQuestion();

            expect(result).toEqual(mockQuestion);
            expect(mockedFetch).toHaveBeenCalledWith(
                expect.stringContaining(API_ENDPOINTS.QUESTIONS.RANDOM)
            );
        });

        test("throws error when server returns non-OK status", async () => {
            const mockResponse = {
                ok: false,
                status: 404,
            } as Response;

            mockedFetch.mockResolvedValue(mockResponse);

            await expect(questionsApiClient.getRandomQuestion()).rejects.toThrow(
                "Server error: 404"
            );
        });

        test("throws error when fetch fails", async () => {
            mockedFetch.mockRejectedValue(new Error("Network failure"));

            await expect(questionsApiClient.getRandomQuestion()).rejects.toThrow(
                "Request failed: Network failure"
            );
        });
    });
});
