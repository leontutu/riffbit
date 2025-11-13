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

describe("questionController", () => {
    describe("getAllQuestions", () => {
        test("responds with questions", async () => {
            const mockData = [{ id: 1, text: "one" }];
            vi.spyOn(questionService, "getAllQuestions").mockResolvedValue(mockData as any);

            const req = {} as any;
            const res = makeRes();

            await questionController.getAllQuestions(req, res);

            expect(res.json).toHaveBeenCalledWith(mockData);
        });
    });

    describe("getQuestionById", () => {
        test("returns 400 for invalid id", async () => {
            const req = { params: { id: "not-a-number" } } as any;
            const res = makeRes();

            await questionController.getQuestionById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.status().json).toHaveBeenCalled();
        });

        test("returns 404 when not found", async () => {
            vi.spyOn(questionService, "getQuestionById").mockResolvedValue(undefined as any);
            const req = { params: { id: "5" } } as any;
            const res = makeRes();

            await questionController.getQuestionById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().json).toHaveBeenCalledWith({
                error: "Question with ID 5 not found",
            });
        });

        test("returns question when found", async () => {
            const mockData = { id: 3, text: "three" };
            vi.spyOn(questionService, "getQuestionById").mockResolvedValue(mockData as any);
            const req = { params: { id: "3" } } as any;
            const res = makeRes();

            await questionController.getQuestionById(req, res);

            expect(res.json).toHaveBeenCalledWith(mockData);
        });
    });

    describe("getRandomQuestion", () => {
        test("responds with a question", async () => {
            const mockData = { id: 9, text: "nine" };
            vi.spyOn(questionService, "getRandomQuestion").mockResolvedValue(mockData as any);
            const req = {} as any;
            const res = makeRes();

            await questionController.getRandomQuestion(req, res);

            expect(res.json).toHaveBeenCalledWith(mockData);
        });
    });
});
