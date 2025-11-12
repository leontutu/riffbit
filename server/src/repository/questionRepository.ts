import { Question } from "@shared/types";
import parse from "csv-parser";
import * as fs from "fs";

const CSV_PATH = "./data/questions.csv";

type CsvData = [string, string];

export function getAllQuestions(): Promise<Question[]> {
    return new Promise((resolve, reject) => {
        const questions: Question[] = [];

        fs.createReadStream(CSV_PATH)
            .pipe(parse({ headers: false }))
            .on("data", (data: CsvData) =>
                questions.push({ id: parseInt(data[0]), text: data[1] as string })
            )
            .on("end", () => {
                console.log(`Successfully loaded ${questions.length} questions.`);
                resolve(questions);
            })
            .on("error", error => {
                console.error("Error reading questions CSV:", error);
                reject(error);
            });
    });
}

export async function fetchRandomQuestion(): Promise<Question> {
    const questions = await getAllQuestions();
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

export async function fetchQuestion(id: number): Promise<Question | undefined> {
    const questions = await getAllQuestions();
    return questions.find(question => question.id === id);
}
