export default class QuestionNotFoundError extends Error {
    status = 404;
    id: number;

    constructor(id: number, message?: string) {
        super(message || `Question with id "${id}" not found`);
        this.name = "QuestionNotFoundError";
        this.id = id;
    }
}
