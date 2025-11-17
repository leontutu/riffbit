import { Category } from "../constants/constants";

/**
 * Shared type definitions used across client and server.
 * Ensures type safety for data transferred between frontend and backend.
 */

export type QuestionDTO = {
    id: number;
    text: string;
    categoryIds: number[];
};

export type UncategorizedQuestion = {
    id: number;
    text: string;
};

export type CategorizedQuestion = {
    id: number;
    text: string;
    categories: Category[];
};
