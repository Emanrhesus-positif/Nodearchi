export class NotFoundError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'NotFoundError';
    }
}
export class NotAuthorizedError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'NotAuthorizedError';
    }
}