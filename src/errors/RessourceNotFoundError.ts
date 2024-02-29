export class RessourceNotFoundError extends Error {
    constructor(public readonly error: any, public readonly entityData: any) {
        super('The entity could not be found.');
    }
}
