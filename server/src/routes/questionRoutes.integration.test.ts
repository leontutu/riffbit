import API_ENDPOINTS from "@shared/constants/apiEndpoints";
import { QuestionDTO } from "@shared/types/types";
import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../app";

describe("Question API Routes", () => {
    describe("GET /api/questions", () => {
        it("returns all questions", async () => {
            const response = await request(app)
                .get(API_ENDPOINTS.QUESTIONS.ALL)
                .expect(200)
                .expect("Content-Type", /json/);

            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);

            const questions: QuestionDTO[] = response.body;

            expect(questions[0]).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    text: expect.any(String),
                    categoryIds: expect.any(Array),
                })
            );
        });
    });

    describe("GET /api/questions/random", () => {
        it("returns a single question", async () => {
            const response = await request(app)
                .get(API_ENDPOINTS.QUESTIONS.RANDOM)
                .expect(200)
                .expect("Content-Type", /json/);

            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("text");
            const question: QuestionDTO = response.body;

            expect(typeof question.id).toBe("number");
            expect(typeof question.text).toBe("string");
            expect(Array.isArray(question.categoryIds)).toBe(true);
        });
    });

    describe("GET /api/questions/:id", () => {
        it("returns the specific question", async () => {
            const response = await request(app)
                .get(API_ENDPOINTS.QUESTIONS.BY_ID(1))
                .expect(200)
                .expect("Content-Type", /json/);

            const question: QuestionDTO = response.body;

            expect(question.id).toBe(1);
            expect(question.text).toBe("What is the meaning of life?");
            expect(question.categoryIds).toEqual([1, 5]);
        });

        it("returns 404 when question does not exist", async () => {
            const response = await request(app)
                .get(API_ENDPOINTS.QUESTIONS.BY_ID(99999))
                .expect(404)
                .expect("Content-Type", /json/);

            expect(response.body.error).toContain("not found");
        });

        it("returns 400 for invalid ID format", async () => {
            const response = await request(app)
                // @ts-expect-error: Testing invalid ID format
                .get(API_ENDPOINTS.QUESTIONS.BY_ID("abc"))
                .expect(400)
                .expect("Content-Type", /json/);

            expect(response.body.error).toContain("Invalid question ID");
        });
    });

    describe("GET /api/questions/random-categorized", () => {
        it("returns a question with valid categoryIds", async () => {
            const response = await request(app)
                .get(API_ENDPOINTS.QUESTIONS.RANDOM_CATEGORIZED([1, 5]))
                .expect(200)
                .expect("Content-Type", /json/);

            const question: QuestionDTO = response.body;

            expect(typeof question.id).toBe("number");
            expect(typeof question.text).toBe("string");
            expect(Array.isArray(question.categoryIds)).toBe(true);
            expect(question.categoryIds.some(id => [1, 5].includes(id))).toBe(true);
        });

        it("returns 400 without categoryIds", async () => {
            const response = await request(app)
                .get(API_ENDPOINTS.QUESTIONS.RANDOM_CATEGORIZED_TEMPLATE)
                .expect(400)
                .expect("Content-Type", /json/);

            expect(response.body.error).toContain("categoryIds query parameter is required");
        });

        it("returns 400 with invalid categoryIds", async () => {
            const response = await request(app)
                .get(`${API_ENDPOINTS.QUESTIONS.RANDOM_CATEGORIZED_TEMPLATE}?categoryIds=invalid`)
                .expect(400)
                .expect("Content-Type", /json/);

            expect(response.body.error).toContain(
                "At least one valid category ID must be provided"
            );
        });
    });
});
