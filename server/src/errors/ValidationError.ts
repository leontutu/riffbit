/**
 * Custom error for invalid request parameters.
 * Results in 400 Bad Request responses.
 */
export default class ValidationError extends Error {
    status = 400;
    field?: string;

    constructor(message: string, field?: string) {
        super(message || `Invalid input params ${field ?? ""}`);
        this.name = "ValidationError";
        this.field = field;
    }
}
