import { Prisma } from "@prisma/client";
import { QuestionDTO } from "@shared/types/types";
import prisma from "src/utils/prisma";

/**
 *  Repository for managing question data.
 *  PostgreSQL + Prisma
 */

type PrismaQuestionWithCategories = Prisma.QuestionGetPayload<{
    include: { categories: true };
}>;

/**
 * Retrieves all questions.
 */
export async function getAllQuestions(): Promise<QuestionDTO[]> {
    const questions = await prisma.question.findMany({
        include: {
            categories: true,
        },
    });
    return questions.map(toDTO);
}

/**
 * Retrieves a randomly selected question.
 */
export async function getRandomQuestion(): Promise<QuestionDTO> {
    const count = await prisma.question.count();
    const skip = Math.floor(Math.random() * count);

    const question = await prisma.question.findFirst({
        skip: skip,
        include: { categories: true },
    });

    if (!question)
        throw new Error(
            "No questions found in database. Something when must have went wrong during initialization."
        );
    return toDTO(question);
}

/**
 * Retrieves a specific question by its ID.
 */
export async function getQuestionById(id: number): Promise<QuestionDTO | undefined> {
    const question = await prisma.question.findUnique({
        where: { id },
        include: { categories: true },
    });

    return question ? toDTO(question) : undefined;
}

/**
 * Retrieves questions that have at least one of the specified category IDs.
 */
export async function getQuestionsWithCategories(categoryIds: number[]): Promise<QuestionDTO[]> {
    const questions = await prisma.question.findMany({
        where: {
            categories: {
                some: {
                    categoryId: { in: categoryIds },
                },
            },
        },
        include: { categories: true },
    });

    return questions.map(toDTO);
}

/**
 * Retrieves a random question from that has at least one of the specified category IDs.
 */
export async function getRandomQuestionWithCategories(categoryIds: number[]): Promise<QuestionDTO> {
    const whereClause = {
        categories: {
            some: {
                categoryId: { in: categoryIds },
            },
        },
    };

    const count = await prisma.question.count({ where: whereClause });

    if (count === 0) {
        throw new Error(`No questions found with category IDs: ${categoryIds.join(", ")}`);
    }

    const skip = Math.floor(Math.random() * count);

    const question = await prisma.question.findFirst({
        where: whereClause,
        skip: skip,
        include: { categories: true },
    });

    if (!question) throw new Error("Unexpected error fetching random question");
    return toDTO(question);
}

const toDTO = (question: PrismaQuestionWithCategories): QuestionDTO => {
    return {
        id: question.id,
        text: question.text,
        categoryIds: question.categories.map(c => c.categoryId),
    };
};
