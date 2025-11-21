import "dotenv/config";
import OpenAI from "openai";
import logger from "src/utils/logger.js";

import { Instructions } from "../external/prompts.js";

/**
 * OpenAI API Client
 * Will eventually be refactored to be part of a python microservice.
 * Provides functions to interact with the OpenAI API for generating questions.
 * Duplicates a lot of code from now, but is easier to parametrize this way.
 * ---------------------------------------------
 * Cost reference for the current configuration
 * - ~350 tokens per question input
 * - 1k output tokens per question generation
 * - gpt5-mini pricing:
 *      - Input: $0.250 / 1M tokens
 *      - Output: $2.000 / 1M tokens
 * -> Approx cost per question generation: $0.0020875
 * -> Approx cost per 1000 question generations: $2.09
 */

const client = new OpenAI();

export async function generateSimilarQuestion(seedQuestion: string) {
    logger.info(`Generating similar question...`);
    logger.debug(`Seed question: ${seedQuestion}`);
    let timerStart = Date.now();
    const response = await client.responses.create({
        model: "gpt-5-mini",
        // reasoning: { effort: "medium" },
        // temperature: 1.5, // unsupported in gpt-5-mini
        instructions: Instructions.SIMILAR,
        input: seedQuestion,
    });
    let timerEnd = Date.now();
    logger.info(`Similar question generation completed in ${timerEnd - timerStart} ms`);
    logger.debug(`Generated question: ${response.output_text}`);
    logger.debug(`Input tokens used: ${response.usage?.input_tokens}`);
    logger.debug(`Output tokens used: ${response.usage?.output_tokens}`);
    return response.output_text.trim();
}

export async function generateFollowUpQuestion(seedQuestion: string) {
    logger.info(`Generating follow-up question...`);
    logger.debug(`Seed question: ${seedQuestion}`);
    let timerStart = Date.now();
    const response = await client.responses.create({
        model: "gpt-5-mini",
        // reasoning: { effort: "medium" },
        // temperature: 1.5, // unsupported in gpt-5-mini
        instructions: Instructions.FOLLOWUP,
        input: seedQuestion,
    });
    let timerEnd = Date.now();
    logger.info(`Follow-up generation completed in ${timerEnd - timerStart} ms`);
    logger.debug(`Generated question: ${response.output_text}`);
    logger.debug(`Input tokens used: ${response.usage?.input_tokens}`);
    logger.debug(`Output tokens used: ${response.usage?.output_tokens}`);
    return response.output_text.trim();
}
