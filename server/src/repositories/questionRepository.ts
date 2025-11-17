import { Question } from "@shared/types/types";
import parse from "csv-parser";
import * as fs from "fs";
import logger from "src/utils/logger";

/**
 * Repository for managing question data.
 * Questions are stored in a CSV file and loaded on demand.
 */

const CSV_PATH = "./data/questions.csv";

type CsvData = [string, string];

/**
 * Retrieves all questions from the CSV data source.
 * @returns Promise resolving to an array of all questions
 */
export function getAllQuestions(): Promise<Question[]> {
    return new Promise((resolve, reject) => {
        const questions: Question[] = [];

        fs.createReadStream(CSV_PATH)
            .pipe(parse({ headers: false }))
            .on("data", (data: CsvData) =>
                questions.push({ id: parseInt(data[0]), text: data[1] as string })
            )
            .on("end", () => {
                resolve(questions);
            })
            .on("error", error => {
                logger.error({ error }, "Failed to load questions from CSV");
                reject(error);
            });
    });
}

/**
 * Retrieves a randomly selected question.
 * @returns Promise resolving to a random question
 */
export async function getRandomQuestion(): Promise<Question> {
    const questions = await getAllQuestions();
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

/**
 * Retrieves a specific question by its ID.
 * @param id - The unique identifier of the question
 * @returns Promise resolving to the question, or undefined if not found
 */
export async function getQuestionById(id: number): Promise<Question | undefined> {
    const questions = await getAllQuestions();
    return questions.find(question => question.id === id);
}
