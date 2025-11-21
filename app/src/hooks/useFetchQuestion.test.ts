import { Category } from "@shared/constants/constants";
import { QuestionDTO } from "@shared/types/types";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import httpService from "../api/services/httpService";
import { useFetchQuestion } from "./useFetchQuestion";

jest.mock("../api/services/httpService", () => ({
    __esModule: true,
    default: {
        questions: {
            getRandomCategorizedQuestion: jest.fn(),
        },
        generation: {
            getSimilarQuestion: jest.fn(),
            getFollowUpQuestion: jest.fn(),
        },
    },
}));
const mockedHttpService = jest.mocked(httpService);

describe("useFetchQuestion Hook", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("returns the correct initial state", async () => {
        const { result, unmount } = renderHook(() => useFetchQuestion());
        const { questionText, isLoading, error, fetchRandom } = result.current;
        expect(questionText).toBeNull();
        expect(isLoading).toBe(false);
        expect(error).toBeNull();
        expect(typeof fetchRandom).toBe("function");
        unmount();
    });

    test("fetches a random question successfully", async () => {
        const mockQuestion: QuestionDTO = {
            id: 12,
            text: "Stimmt es - wie die Nase eines Mannes, so auch sein Johannes?",
            categoryIds: [1, 2],
        };

        mockedHttpService.questions.getRandomCategorizedQuestion.mockResolvedValue(mockQuestion);

        const { result } = renderHook(() => useFetchQuestion());
        act(() => {
            result.current.fetchRandom();
        });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const { currentQuestionId, questionText, error } = result.current;
        expect(questionText).toEqual(mockQuestion.text);
        expect(currentQuestionId).toEqual(mockQuestion.id);
        expect(error).toBeNull();
    });

    test("sets an error when the API call fails", async () => {
        mockedHttpService.questions.getRandomCategorizedQuestion.mockRejectedValue(
            new Error("Network error")
        );
        const { result } = renderHook(() => useFetchQuestion());
        act(() => {
            result.current.fetchRandom();
        });
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        const { questionText, error } = result.current;
        expect(questionText).toBeNull();
        expect(error).toBe("Network error");
    });

    test("refresh fetches a new question", async () => {
        const mockQuestion1: QuestionDTO = { id: 1, text: "First", categoryIds: [1] };
        const mockQuestion2: QuestionDTO = { id: 2, text: "Second", categoryIds: [2] };

        mockedHttpService.questions.getRandomCategorizedQuestion
            .mockResolvedValueOnce(mockQuestion1)
            .mockResolvedValueOnce(mockQuestion2);

        const { result } = renderHook(() => useFetchQuestion());
        act(() => {
            result.current.fetchRandom();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.questionText).toEqual(mockQuestion1.text);

        act(() => {
            result.current.fetchRandom();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.questionText).toEqual(mockQuestion2.text);
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

        const { result } = renderHook(() => useFetchQuestion());

        act(() => {
            result.current.setToggles(mockToggles);
        });

        act(() => {
            result.current.fetchRandom();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockedHttpService.questions.getRandomCategorizedQuestion).toHaveBeenCalledWith([
            1, 7,
        ]);
    });

    test("fetches a similar question successfully", async () => {
        const mockQuestion: QuestionDTO = {
            id: 42,
            text: "What is the meaning of life?",
            categoryIds: [1],
        };
        const mockGeneratedText = "What is the purpose of existence?";

        mockedHttpService.questions.getRandomCategorizedQuestion.mockResolvedValue(mockQuestion);
        mockedHttpService.generation.getSimilarQuestion.mockResolvedValue(mockGeneratedText);

        const { result } = renderHook(() => useFetchQuestion());

        act(() => {
            result.current.fetchRandom();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        act(() => {
            result.current.fetchSimilar();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockedHttpService.generation.getSimilarQuestion).toHaveBeenCalledWith(42);
        expect(result.current.questionText).toBe(mockGeneratedText);
        expect(result.current.error).toBeNull();
    });

    test("fetches a follow-up question successfully", async () => {
        const mockQuestion: QuestionDTO = {
            id: 99,
            text: "Do you believe in fate?",
            categoryIds: [2],
        };
        const mockFollowUpText = "If fate exists, do we have free will?";

        mockedHttpService.questions.getRandomCategorizedQuestion.mockResolvedValue(mockQuestion);
        mockedHttpService.generation.getFollowUpQuestion.mockResolvedValue(mockFollowUpText);

        const { result } = renderHook(() => useFetchQuestion());

        act(() => {
            result.current.fetchRandom();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        act(() => {
            result.current.fetchFollowUp();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockedHttpService.generation.getFollowUpQuestion).toHaveBeenCalledWith(99);
        expect(result.current.questionText).toBe(mockFollowUpText);
        expect(result.current.error).toBeNull();
    });

    test("sets error when trying to generate without a current question", async () => {
        const { result } = renderHook(() => useFetchQuestion());

        act(() => {
            result.current.fetchSimilar();
        });
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.error).toBe("No question to generate from");
        expect(result.current.questionText).toBeNull();
        expect(mockedHttpService.generation.getSimilarQuestion).not.toHaveBeenCalled();
    });
});
