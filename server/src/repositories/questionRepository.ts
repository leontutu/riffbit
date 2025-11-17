import { QuestionDTO, UncategorizedQuestion } from "@shared/types/types";
import parse from "csv-parser";
import * as fs from "fs";
import logger from "src/utils/logger";

/**
 * Repository for managing question data.
 * Questions are stored in a CSV file and loaded on demand.
 */

const QUESTIONS_CSV_PATH = "./data/questions.csv";
const QUESTION_CATEGORIES_CSV_PATH = "./data/question_categories.csv";

type CsvData = [string, string];

let cachedQuestions: QuestionDTO[] | null = null;

/**
 * Parses a CSV file and returns all rows.
 */
function parseCsv<T>(filePath: string, transformer: (data: CsvData) => T): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];

        fs.createReadStream(filePath)
            .pipe(parse({ headers: false }))
            .on("data", (data: CsvData) => results.push(transformer(data)))
            .on("end", () => resolve(results))
            .on("error", error => reject(error));
    });
}

/**
 * Retrieves all questions from the CSV data source with their category IDs.
 * Results are cached after the first load.
 * @returns Promise resolving to an array of all questions with categories
 */
export async function getAllQuestions(): Promise<QuestionDTO[]> {
    if (cachedQuestions) {
        return cachedQuestions;
    }

    try {
        const questions = await parseCsv<UncategorizedQuestion>(QUESTIONS_CSV_PATH, data => ({
            id: parseInt(data[0]),
            text: data[1] as string,
        }));

        const questionCategories = await parseCsv<{ questionId: number; categoryId: number }>(
            QUESTION_CATEGORIES_CSV_PATH,
            data => ({ questionId: parseInt(data[0]), categoryId: parseInt(data[1]) })
        );

        const categoryMap = new Map<number, number[]>();
        for (const { questionId, categoryId } of questionCategories) {
            if (!categoryMap.has(questionId)) {
                categoryMap.set(questionId, []);
            }
            categoryMap.get(questionId)!.push(categoryId);
        }

        cachedQuestions = questions.map(q => ({
            id: q.id,
            text: q.text,
            categoryIds: categoryMap.get(q.id) || [],
        }));

        return cachedQuestions;
    } catch (error) {
        logger.error({ error }, "Failed to load questions from CSV");
        throw error;
    }
}

/**
 * Retrieves a randomly selected question.
 * @returns Promise resolving to a random question
 */
export async function getRandomQuestion(): Promise<QuestionDTO> {
    const questions = await getAllQuestions();
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

/**
 * Retrieves a specific question by its ID.
 * @param id - The unique identifier of the question
 * @returns Promise resolving to the question, or undefined if not found
 */
export async function getQuestionById(id: number): Promise<QuestionDTO | undefined> {
    const questions = await getAllQuestions();
    return questions.find(question => question.id === id);
}
