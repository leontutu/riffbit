import { afterEach, describe, expect, test, vi } from "vitest";

import * as questionRepository from "../repositories/questionRepository";
import * as questionService from "./questionService";

afterEach(() => {
    vi.restoreAllMocks();
});

describe("questionService", () => {
    describe("getAllQuestions", () => {
        test("returns repository data", async () => {
            const mockData = [{ id: 1, text: "one" }];
            vi.spyOn(questionRepository, "getAllQuestions").mockResolvedValue(mockData as any);

            const result = await questionService.getAllQuestions();
            expect(result).toEqual(mockData);
        });
    });

    describe("getQuestionById", () => {
        test("returns a question when found", async () => {
            const mockData = { id: 2, text: "two" };
            vi.spyOn(questionRepository, "getQuestionById").mockResolvedValue(mockData as any);

            const result = await questionService.getQuestionById(2);
            expect(result).toEqual(mockData);
        });
    });

    describe("getRandomQuestion", () => {
        test("returns a question", async () => {
            const mockData = [{ id: 1, text: "one" }];
            vi.spyOn(questionRepository, "getRandomQuestion").mockResolvedValue(mockData as any);

            const result = await questionService.getRandomQuestion();
            expect(mockData).toEqual(result as any);
        });
    });
});
