import { AbstractEntityRepository } from './repository/AbstractEntityRepository';
import { AbstractEntity } from './entity/AbstractEntity';
import { HandlerInterface } from './handler/HandlerInterface';
import { v5 as uuidv5 } from 'uuid';

type EntityMetadata<EntityType extends AbstractEntity> = {
    repositoryClass?: typeof AbstractEntityRepository<EntityType>;
};

const META_DATASTORE_WORKSPACE = 'f21e9b33-2790-49db-91a1-34414da92619';

class EntityMetadataStore {
    private entityMetadata: { [entityName: string]: EntityMetadata<AbstractEntity> } = {};

    public addRepository<EntityType extends AbstractEntity>(
        entity: typeof AbstractEntity,
        repository: typeof AbstractEntityRepository<EntityType>,
    ) {
        const entityName = entity.name;
        const uuid = uuidv5(entityName, META_DATASTORE_WORKSPACE);
        if (!Object.keys(this.entityMetadata).includes(uuid)) {
            this.entityMetadata[uuid] = {};
        }

        this.entityMetadata[uuid].repositoryClass = repository;
    }

    public getRepository<
        EntityType extends typeof AbstractEntity,
        RepositoryType extends AbstractEntityRepository<EntityType>
    >(entity: EntityType, handler: HandlerInterface): RepositoryType | null {
        const entityName = entity.name;
        const uuid = uuidv5(entityName, META_DATASTORE_WORKSPACE);

        if (
            !Object.keys(this.entityMetadata).includes(uuid) ||
            typeof this.entityMetadata[uuid].repositoryClass != 'function'
        ) {
            return null;
        }

        const RepoClass = this.entityMetadata[uuid].repositoryClass;

        // @ts-ignore
        return new RepoClass(entity, handler);
    }
}

const entityMetadataStore = new EntityMetadataStore();

export default entityMetadataStore;
