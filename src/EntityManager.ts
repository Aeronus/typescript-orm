import { ClassConstructor, plainToInstance } from 'class-transformer';
import { EntityInterface } from './entity/EntityInterface';
import { EntityRepository } from './repository/EntityRepository';
import entityMetadataStore from './metadata/EntityMetadataStore';
import { HandleRequestProps, HandlerInterface } from './handler/HandlerInterface';
import { LoggerHandler } from './handler/LoggerHandler';
import { ClassTransformOptions } from 'class-transformer/types/interfaces/class-transformer-options.interface';

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

    public async handleRequest<ReturnType>(
        options: HandleRequestProps,
        typeConstructor: ClassConstructor<ReturnType>,
        convertOptions: ClassTransformOptions = {},
    ): Promise<ReturnType | null> {
        const returnValue = await this.handleRawRequest(options);

        if (returnValue === null) {
            return null;
        }

        // handle response from fetch
        // if (Object.keys(returnValue).includes('json') && typeof returnValue.json == 'function') {
        //     returnValue = await returnValue.json();
        // }

        return plainToInstance(typeConstructor, returnValue, convertOptions);
    }

    public handleRawRequest(options: HandleRequestProps) {
        return this._entityHandler.handleRequest(options);
    }
}

const EntityManager = new EntityManagerClass();

export default EntityManager;
