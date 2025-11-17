import { describe, expect, test } from "vitest";

import { getAllQuestions, getQuestionById, getRandomQuestion } from "./questionRepository";

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
});
