export class UnprocessableEntityError extends Error {
    constructor(public readonly error: any, public readonly entityData: any) {
        super('The uploaded entity has some errors');
    }
}
