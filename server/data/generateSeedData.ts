import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Category {
    id: number;
    name: string;
}

interface QuestionCategory {
    questionId: number;
    categoryId: number;
}

interface Question {
    id: number;
    text: string;
}

interface SeedQuestion {
    text: string;
    categories: string[];
}

function parseCSV<T>(filePath: string, parser: (line: string) => T | null): T[] {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.trim().split("\n");

    return lines.map(line => parser(line)).filter((item): item is T => item !== null);
}

function parseCategory(line: string): Category | null {
    const match = line.match(/^(\d+),\s*(.+)$/);
    if (!match) return null;

    return {
        id: parseInt(match[1], 10),
        name: match[2].trim(),
    };
}

function parseQuestion(line: string): Question | null {
    const match = line.match(/^(\d+),"(.+)"$/);
    if (!match) return null;

    return {
        id: parseInt(match[1], 10),
        text: match[2],
    };
}

function parseQuestionCategory(line: string): QuestionCategory | null {
    const match = line.match(/^(\d+),(\d+)$/);
    if (!match) return null;

    return {
        questionId: parseInt(match[1], 10),
        categoryId: parseInt(match[2], 10),
    };
}

function generateSeedData(): SeedQuestion[] {
    const categoriesPath = path.join(__dirname, "categories.csv");
    const questionsPath = path.join(__dirname, "questions.csv");
    const questionCategoriesPath = path.join(__dirname, "question_categories.csv");

    const categories = parseCSV<Category>(categoriesPath, parseCategory);
    const questions = parseCSV<Question>(questionsPath, parseQuestion);
    const questionCategories = parseCSV<QuestionCategory>(
        questionCategoriesPath,
        parseQuestionCategory
    );

    const categoryMap = new Map<number, string>();
    categories.forEach(cat => categoryMap.set(cat.id, cat.name));

    const questionCategoryMap = new Map<number, number[]>();
    questionCategories.forEach(qc => {
        const existing = questionCategoryMap.get(qc.questionId) || [];
        existing.push(qc.categoryId);
        questionCategoryMap.set(qc.questionId, existing);
    });

    return questions.map(question => {
        const categoryIds = questionCategoryMap.get(question.id) || [];
        const categoryNames = categoryIds
            .map(id => categoryMap.get(id))
            .filter((name): name is string => name !== undefined);

        return {
            text: question.text,
            categories: categoryNames,
        };
    });
}

function writeSeedFile(): void {
    const data = generateSeedData();

    const outputPath = path.join(__dirname, "seedData.ts");
    const content = `export const data = ${JSON.stringify(data, null, 2)};\n`;

    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`✓ Generated seedData.ts with ${data.length} questions`);
}

writeSeedFile();
