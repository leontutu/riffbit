import { Category } from "@shared/constants/constants";
import { QuestionDTO } from "@shared/types/types";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import questionsApiService from "../api/services/questionsApiService";
import { useRandomQuestion } from "./useQuestionsApi";

jest.mock("../api/services/questionsApiService", () => ({
    __esModule: true,
    default: {
        getRandomCategorizedQuestion: jest.fn(),
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
        expect(isLoading).toBe(false);
        expect(error).toBeNull();
        expect(typeof refresh).toBe("function");
        unmount();
    });

    test("fetches a random question successfully", async () => {
        const mockQuestion: QuestionDTO = {
            id: 12,
            text: "Stimmt es - wie die Nase eines Mannes, so auch sein Johannes?",
            categoryIds: [1, 2],
        };

        mockedApiService.getRandomCategorizedQuestion.mockResolvedValue(mockQuestion);

        const { result } = renderHook(() => useRandomQuestion());
        act(() => {
            result.current.refresh();
        });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const { question, error } = result.current;
        expect(question).toEqual(mockQuestion);
        expect(error).toBeNull();
    });

    test("sets an error when the API call fails", async () => {
        mockedApiService.getRandomCategorizedQuestion.mockRejectedValue(new Error("Network error"));
        const { result } = renderHook(() => useRandomQuestion());
        act(() => {
            result.current.refresh();
        });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        const { question, error } = result.current;
        expect(question).toBeNull();
        expect(error).toBe("Network error");
    });

    test("refresh fetches a new question", async () => {
        const mockQuestion1: QuestionDTO = { id: 1, text: "First", categoryIds: [1] };
        const mockQuestion2: QuestionDTO = { id: 2, text: "Second", categoryIds: [2] };

        mockedApiService.getRandomCategorizedQuestion
            .mockResolvedValueOnce(mockQuestion1)
            .mockResolvedValueOnce(mockQuestion2);

        const { result } = renderHook(() => useRandomQuestion());
        act(() => {
            result.current.refresh();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.question).toEqual(mockQuestion1);

        act(() => {
            result.current.refresh();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.question).toEqual(mockQuestion2);
    });

    test("sends correct category IDs to API", async () => {
        const mockToggles = {
            [Category.PHILOSOPHY]: true,
            [Category.ROMANCE]: false,
            [Category.DILEMMA]: false,
            [Category.FANTASY]: false,
            [Category.REFLECTION]: false,
            [Category.MEMORIES]: false,
            [Category.FUN]: true,
            [Category.SECRETS]: false,
        };

        const { result } = renderHook(() => useRandomQuestion());

        act(() => {
            result.current.setToggles(mockToggles);
        });

        act(() => {
            result.current.refresh();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockedApiService.getRandomCategorizedQuestion).toHaveBeenCalledWith([1, 7]);
    });
});
