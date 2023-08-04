import { AbstractEntityRepository } from './repository/AbstractEntityRepository';
import { AbstractEntity } from './entity/AbstractEntity';
import entityMetadataStore from './EntityMetadataStore';
import { HandlerInterface } from './handler/HandlerInterface';

class EntityManagerClass {
    protected handler: HandlerInterface | null = null;

    public setHandler(handler: HandlerInterface | null) {
        this.handler = handler;
    }

    public getRepository<
        EntityType extends typeof AbstractEntity,
        RepositoryType extends AbstractEntityRepository<EntityType>,
    >(entityType: EntityType): RepositoryType {
        if (!this.handler) {
            throw new Error('No handler was set. Please use EntityManager.setHandler() to set a handler.');
        }

        const repository = entityMetadataStore.getRepository<EntityType, RepositoryType>(entityType, this.handler);

        if (repository == null) {
            throw new Error(`No repository was found for entity ${entityType.name}`);
        }

        return repository;
    }
}

const EntityManager = new EntityManagerClass();

export default EntityManager;
