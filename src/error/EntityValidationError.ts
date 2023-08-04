import { AbstractEntity } from '../entity/AbstractEntity';
import { ValidationError } from 'class-validator';

export class EntityValidationError extends Error {
    protected errors: ValidationError[] = [];
    constructor(entity: typeof AbstractEntity, errors: ValidationError[]) {
        super(`Validating the entity ${entity.name} fails.`);

        this.name = 'EntityValidationError';
        this.errors = errors;
    }
}
