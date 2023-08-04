import { AbstractEntity } from '../entity/AbstractEntity';

export class EntityNotFoundError extends Error {
    constructor(id: string) {
        super(`No entity found for id ${id}`);
    }
}