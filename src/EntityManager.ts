import { ClassConstructor, plainToInstance } from 'class-transformer';
import { EntityInterface } from './entity/EntityInterface';
import { EntityRepository } from './repository/EntityRepository';
import entityMetadataStore from './metadata/EntityMetadataStore';
import { HandleRequestProps, HandlerInterface } from './handler/HandlerInterface';
import { LoggerHandler } from './handler/LoggerHandler';
import { ClassTransformOptions } from 'class-transformer/types/interfaces/class-transformer-options.interface';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { EntityValidationError } from './errors/EntityValidationError';

export interface HandleRequestParams<ReturnType> {
    options: HandleRequestProps;
    typeConstructor: ClassConstructor<ReturnType>;
    convertOptions?: ClassTransformOptions;
    useValidation?: boolean;
    validationOptions?: ValidatorOptions;
}

class EntityManagerClass {
    private _entityHandler: HandlerInterface = new LoggerHandler();

    public setEntityHandler(handler: HandlerInterface) {
        this._entityHandler = handler;
    }

    public getRepository<EntityType extends EntityInterface, RepositoryType extends EntityRepository<EntityType>>(
        entityType: ClassConstructor<EntityType>,
    ): RepositoryType {
        const repository = entityMetadataStore.getRepository<EntityType, RepositoryType>(entityType);

        if (repository == null) {
            throw new Error(`No repository was found for entity ${entityType.name}`);
        }

        return repository;
    }

    public async handleRequest<ReturnType>({
        options,
        typeConstructor,
        convertOptions = {},
        useValidation = true,
        validationOptions = {},
    }: HandleRequestParams<ReturnType>): Promise<ReturnType | null> {
        const returnValue: any = await this.handleRawRequest(options);

        if (returnValue === null) {
            return null;
        }

        const entity: ReturnType = plainToInstance<ReturnType, any>(typeConstructor, returnValue, convertOptions);

        if (useValidation) {
            const validationErrors: ValidationError[][] = [await validate(entity as object, validationOptions)];

            if (validationErrors.some((elem) => Array.isArray(elem) && elem.length > 0)) {
                throw new EntityValidationError(validationErrors);
            }
        }

        return entity;
    }

    public async handleCollectionRequest<ReturnType>({
        options,
        typeConstructor,
        convertOptions = {},
        validationOptions = {},
        useValidation = true,
    }: HandleRequestParams<ReturnType>): Promise<ReturnType[] | null> {
        const returnValue: any = await this.handleRawRequest(options);

        if (returnValue === null) {
            return null;
        }

        const entity: ReturnType[] = plainToInstance<ReturnType, any[]>(typeConstructor, returnValue, convertOptions);

        if (useValidation) {
            const validationErrors: ValidationError[][] = [];

            for (const entityItem of entity as ReturnType[]) {
                validationErrors.push(await validate(entityItem as object, validationOptions));
            }

            if (validationErrors.some((elem) => Array.isArray(elem) && elem.length > 0)) {
                throw new EntityValidationError(validationErrors);
            }
        }

        return entity;
    }

    public handleRawRequest<RequestReturnType>(options: HandleRequestProps): Promise<RequestReturnType | null> {
        return this._entityHandler.handleRequest(options);
    }
}

const EntityManager = new EntityManagerClass();

export default EntityManager;
