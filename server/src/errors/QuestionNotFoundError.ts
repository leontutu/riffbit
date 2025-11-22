/**
 * Custom error for when a requested question
 * doesn't exist in the data source.
 * Results in 404 Not Found responses.
 */
export default class QuestionNotFoundError extends Error {
    status = 404;
    id: number;

    constructor(id: number, message?: string) {
        super(message || `Question with id "${id}" not found`);
        this.name = "QuestionNotFoundError";
        this.id = id;
    }
}
