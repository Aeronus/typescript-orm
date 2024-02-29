
export class UnknownError extends Error {
    constructor(public readonly error: any) {
        super('An unknown  error occurred.');
    }
}
