import { Question } from "@shared/types";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import questionsApiService from "../api/services/questionsApiService";
import { useRandomQuestion } from "./useQuestionsApi";

jest.mock("../api/services/questionsApiService", () => ({
    __esModule: true,
    default: {
        getRandomQuestion: jest.fn(),
    },
}));

const mockedApiService = questionsApiService as jest.Mocked<typeof questionsApiService>;
describe("useQuestionApi Hook", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("returns the correct initial state", async () => {
        const { result, unmount } = renderHook(() => useRandomQuestion());
        const { question, isLoading, error, refresh } = result.current;
        expect(question).toBeNull();
        expect(isLoading).toBe(true);
        expect(error).toBeNull();
        expect(typeof refresh).toBe("function");
        unmount();
    });

    test("fetches a random question successfully", async () => {
        const mockQuestion: Question = {
            id: 12,
            text: "Stimmt es - wie die Nase eines Mannes, so auch sein Johannes?",
        };

        mockedApiService.getRandomQuestion.mockResolvedValue(mockQuestion);

        const { result } = renderHook(() => useRandomQuestion());
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const { question, error } = result.current;
        expect(question).toEqual(mockQuestion);
        expect(error).toBeNull();
    });

    test("sets an error when the API call fails", async () => {
        mockedApiService.getRandomQuestion.mockRejectedValue(new Error("Network error"));
        const { result } = renderHook(() => useRandomQuestion());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        const { question, error } = result.current;
        expect(question).toBeNull();
        expect(error).toBe("Network error");
    });

    test("refresh fetches a new question", async () => {
        const mockQuestion1: Question = { id: 1, text: "First" };
        const mockQuestion2: Question = { id: 2, text: "Second" };

        mockedApiService.getRandomQuestion
            .mockResolvedValueOnce(mockQuestion1)
            .mockResolvedValueOnce(mockQuestion2);

        const { result } = renderHook(() => useRandomQuestion());

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.question).toEqual(mockQuestion1);

        act(() => {
            result.current.refresh();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.question).toEqual(mockQuestion2);
    });
});
