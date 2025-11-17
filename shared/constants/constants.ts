/**
 * Shared constants used across client and server.
 * Ensures consistency for data transferred between frontend and backend.
 */

// Held in sync with server/data/categories.csv
export enum Category {
    PHILOSOPHY = "philosophy",
    ROMANCE = "romance",
    DILEMMA = "dilemma",
    FANTASY = "fantasy",
    REFLECTION = "reflection",
    MEMORIES = "memories",
    FUN = "fun",
    SECRETS = "secrets",
}

export const CATEGORY_ID_TO_CATEGORY = new Map<number, Category>([
    [1, Category.PHILOSOPHY],
    [2, Category.ROMANCE],
    [3, Category.DILEMMA],
    [4, Category.FANTASY],
    [5, Category.REFLECTION],
    [6, Category.MEMORIES],
    [7, Category.FUN],
    [8, Category.SECRETS],
]);
