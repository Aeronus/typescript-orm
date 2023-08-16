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

    public getRepository<EntityType extends EntityInterface>(
        entityType: ClassConstructor<EntityType>,
    ): EntityRepository<EntityType> {
        const repository = entityMetadataStore.getRepository<EntityType>(entityType);

        if (repository == null) {
            throw new Error(`No repository was found for entity ${entityType.name}`);
        }

        return repository;
    }

    public async handleRequest<ReturnType>(
        options: HandleRequestProps,
        typeConstructor: ClassConstructor<ReturnType>,
        convertOptions: ClassTransformOptions = {
            excludeExtraneousValues: true,
        },
    ): Promise<ReturnType | null> {
        let returnValue = await this.handleRawRequest(options);

        if (returnValue === null) {
            return null;
        }

        // handle response from fetch
        if (returnValue instanceof Response) {
            returnValue = await returnValue.json();
        }

        return plainToInstance(typeConstructor, returnValue, convertOptions);
    }

    public handleRawRequest(options: HandleRequestProps) {
        return this._entityHandler.handleRequest(options);
    }
}

const EntityManager = new EntityManagerClass();

export default EntityManager;
