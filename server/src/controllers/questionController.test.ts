import QuestionNotFoundError from "src/errors/QuestionNotFoundError";
import { afterEach, describe, expect, test, vi } from "vitest";

import * as questionService from "../services/questionService";
import * as questionController from "./questionController";

afterEach(() => {
    vi.restoreAllMocks();
});

function makeRes() {
    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });
    return { json, status } as unknown as any;
}

function makeNext() {
    return vi.fn();
}

describe("questionController", () => {
    describe("getAllQuestions", () => {
        test("responds with questions", async () => {
            const mockData = [{ id: 1, text: "one" }];
            vi.spyOn(questionService, "getAllQuestions").mockResolvedValue(mockData as any);

            const req = {} as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getAllQuestions(req, res, next);

            expect(res.json).toHaveBeenCalledWith(mockData);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("getQuestionById", () => {
        test("passes ValidationError to next for invalid id", async () => {
            const req = { params: { id: "not-a-number" } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getQuestionById(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next.mock.calls[0][0].message).toBe("Invalid question ID format");
        });

        test("passes QuestionNotFoundError to next when not found", async () => {
            vi.spyOn(questionService, "getQuestionById").mockRejectedValue(
                new QuestionNotFoundError(5)
            );
            const req = { params: { id: "5" } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getQuestionById(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(QuestionNotFoundError));
        });

        test("returns question when found", async () => {
            const mockData = { id: 3, text: "three" };
            vi.spyOn(questionService, "getQuestionById").mockResolvedValue(mockData as any);
            const req = { params: { id: "3" } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getQuestionById(req, res, next);

            expect(res.json).toHaveBeenCalledWith(mockData);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("getRandomQuestion", () => {
        test("responds with a question", async () => {
            const mockData = { id: 9, text: "nine" };
            vi.spyOn(questionService, "getRandomQuestion").mockResolvedValue(mockData as any);
            const req = {} as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getRandomQuestion(req, res, next);

            expect(res.json).toHaveBeenCalledWith(mockData);
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe("getRandomQuestionWithCategories", () => {
        test("passes ValidationError to next when categoryIds query param is missing", async () => {
            const req = { query: {} } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getRandomQuestionWithCategories(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next.mock.calls[0][0].message).toBe("categoryIds query parameter is required");
        });

        test("passes ValidationError to next when categoryIds is not a string", async () => {
            const req = { query: { categoryIds: 123 } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getRandomQuestionWithCategories(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next.mock.calls[0][0].message).toBe("categoryIds query parameter is required");
        });

        test("passes ValidationError to next when no valid category IDs are provided", async () => {
            const req = { query: { categoryIds: "invalid,abc" } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getRandomQuestionWithCategories(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(next.mock.calls[0][0].message).toBe(
                "At least one valid category ID must be provided"
            );
        });

        test("responds with a question when valid categoryIds are provided", async () => {
            const mockData = { id: 10, text: "categorized question" };
            vi.spyOn(questionService, "getRandomQuestionWithCategories").mockResolvedValue(
                mockData as any
            );
            const req = { query: { categoryIds: "1,2,3" } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getRandomQuestionWithCategories(req, res, next);

            expect(questionService.getRandomQuestionWithCategories).toHaveBeenCalledWith([1, 2, 3]);
            expect(res.json).toHaveBeenCalledWith(mockData);
            expect(next).not.toHaveBeenCalled();
        });

        test("filters out invalid IDs and processes valid ones", async () => {
            const mockData = { id: 11, text: "another question" };
            vi.spyOn(questionService, "getRandomQuestionWithCategories").mockResolvedValue(
                mockData as any
            );
            const req = { query: { categoryIds: "1,invalid,2,abc,3" } } as any;
            const res = makeRes();
            const next = makeNext();

            await questionController.getRandomQuestionWithCategories(req, res, next);

            expect(questionService.getRandomQuestionWithCategories).toHaveBeenCalledWith([1, 2, 3]);
            expect(res.json).toHaveBeenCalledWith(mockData);
            expect(next).not.toHaveBeenCalled();
        });
    });
});
