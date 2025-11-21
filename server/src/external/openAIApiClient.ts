import "dotenv/config";
import OpenAI from "openai";
import logger from "src/utils/logger.js";

import { Instructions } from "../external/prompts.js";

/**
 * OpenAI API Client
 * Will eventually be refactored to be part of a python microservice.
 * Provides functions to interact with the OpenAI API for generating questions.
 * Duplicates a lot of code from now, but is easier to parametrize this way.
 */

const client = new OpenAI();

export async function generateSimilarQuestion(seedQuestion: string) {
    logger.info(`Generating similar question...`);
    let timerStart = Date.now();
    const response = await client.responses.create({
        model: "gpt-5-mini",
        reasoning: { effort: "medium" },
        temperature: 1.5,
        max_output_tokens: 40,
        instructions: Instructions.SIMILAR,
        input: seedQuestion,
    });
    let timerEnd = Date.now();
    logger.info(`Similar question generation completed in ${timerEnd - timerStart} ms`);
    return response.output_text.trim();
}

export async function generateFollowupQuestion(seedQuestion: string) {
    logger.info(`Generating follow-up question...`);
    let timerStart = Date.now();

    const response = await client.responses.create({
        model: "gpt-5-mini",
        reasoning: { effort: "medium" },
        temperature: 1.5,
        max_output_tokens: 40,
        instructions: Instructions.FOLLOWUP,
        input: seedQuestion,
    });
    let timerEnd = Date.now();
    logger.info(`Follow-up generation completed in ${timerEnd - timerStart} ms`);
    return response.output_text.trim();
}
