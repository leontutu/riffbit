import { Question } from "@shared/types";
import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../app";

describe("Question API Routes", () => {
    it("GET /api/questions returns all questions", async () => {
        const response = await request(app)
            .get("/api/questions")
            .expect(200)
            .expect("Content-Type", /json/);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        const questions: Question[] = response.body;

        expect(questions[0]).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                text: expect.any(String),
            })
        );
    });

    it("GET /api/questions/random returns a single question", async () => {
        const response = await request(app)
            .get("/api/questions/random")
            .expect(200)
            .expect("Content-Type", /json/);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("text");
        const question: Question = response.body;

        expect(typeof question.id).toBe("number");
        expect(typeof question.text).toBe("string");
    });

    it("GET /api/questions/1 returns the specific question", async () => {
        const response = await request(app)
            .get("/api/questions/1")
            .expect(200)
            .expect("Content-Type", /json/);

        const question: Question = response.body;

        expect(question.id).toBe(1);
        expect(question.text).toBe("What is the meaning of life?");
    });

    it("GET /api/questions/9999 returns 404", async () => {
        const response = await request(app)
            .get("/api/questions/9999")
            .expect(404)
            .expect("Content-Type", /json/);

        expect(response.body.error).toContain("not found");
    });

    it("GET /api/questions/abc returns 400", async () => {
        const response = await request(app)
            .get("/api/questions/abc")
            .expect(400)
            .expect("Content-Type", /json/);

        expect(response.body.error).toContain("Invalid question ID");
    });
});
