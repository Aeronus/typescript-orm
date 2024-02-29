import { ValidationError } from 'class-validator';

export class EntityValidationError extends Error {
    constructor(public readonly validationErrors: ValidationError[][]) {
        super('A validation error occurred while the entity was fetched');
    }
}
