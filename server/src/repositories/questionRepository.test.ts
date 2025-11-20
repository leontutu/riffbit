import { describe, expect, test } from "vitest";

import {
    getAllQuestions,
    getQuestionById,
    getQuestionsWithCategories,
    getRandomQuestion,
    getRandomQuestionWithCategories,
} from "./questionRepository";

describe("questionRepository", () => {
    test("loads all questions from CSV", async () => {
        const questions = await getAllQuestions();
        expect(questions.length).toBeGreaterThan(0);
        const question = questions[0];
        expect(question).toBeDefined();
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("text");
        expect(typeof question.id).toBe("number");
        expect(typeof question.text).toBe("string");
    });

    test("fetches specific question", async () => {
        let question = await getQuestionById(1);
        expect(question).toBeDefined();
        expect(question!.id).toBe(1);
        expect(question!.text).toBe("What is the meaning of life?");

        question = await getQuestionById(99999);
        expect(question).toBeUndefined();
    });

    test("fetches random question", async () => {
        let question = await getRandomQuestion();
        expect(question).toBeDefined();
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("text");
        expect(typeof question.id).toBe("number");
        expect(typeof question.text).toBe("string");
    });

    test("loads questions with categoryIds", async () => {
        const questions = await getAllQuestions();
        const question = questions[0];
        expect(question).toHaveProperty("categoryIds");
        expect(Array.isArray(question.categoryIds)).toBe(true);
        expect(question.categoryIds.length).toBeGreaterThan(0);
    });

    test("fetches questions with specific categories", async () => {
        const questions = await getQuestionsWithCategories([1, 2]);
        expect(questions.length).toBeGreaterThan(0);

        questions.forEach(question => {
            expect(question.categoryIds.some(catId => [1, 2].includes(catId))).toBe(true);
        });
    });

    test("returns empty array when no questions match categories", async () => {
        const questions = await getQuestionsWithCategories([99999]);
        expect(questions).toEqual([]);
    });

    test("fetches random question with specific categories", async () => {
        const question = await getRandomQuestionWithCategories([1, 2]);
        expect(question).toBeDefined();
        expect(question).toHaveProperty("id");
        expect(question).toHaveProperty("text");
        expect(question).toHaveProperty("categoryIds");
        expect(question.categoryIds.some(catId => [1, 2].includes(catId))).toBe(true);
    });

    test("throws error when no questions match categories for random selection", async () => {
        await expect(getRandomQuestionWithCategories([99999])).rejects.toThrow(
            "No questions found with category IDs: 99999"
        );
    });
});
