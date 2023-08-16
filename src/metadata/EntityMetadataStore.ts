import { v5 as uuidv5 } from 'uuid';
import { EntityInterface } from '../entity/EntityInterface';
import { EntityRepository } from '../repository/EntityRepository';
import { ClassConstructor } from 'class-transformer';

type EntityMetadata<EntityType extends EntityInterface> = {
    repositoryClass?: ClassConstructor<EntityRepository<EntityType>>;
};

const META_DATASTORE_WORKSPACE = 'f21e9b33-2790-49db-91a1-34414da92619';

class EntityMetadataStore {
    private entityMetadata: { [entityName: string]: EntityMetadata<EntityInterface> } = {};

    public addRepository<EntityType extends EntityInterface>(
        entity: ClassConstructor<EntityType>,
        repository: ClassConstructor<EntityRepository<EntityType>>,
    ) {
        const entityName = entity.name;
        const uuid = uuidv5(entityName, META_DATASTORE_WORKSPACE);
        if (!Object.keys(this.entityMetadata).includes(uuid)) {
            this.entityMetadata[uuid] = {};
        }

        this.entityMetadata[uuid].repositoryClass = repository;
    }

    public getRepository<EntityType extends EntityInterface>(
        entity: ClassConstructor<EntityType>,
    ): EntityRepository<EntityType> | null {
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
        return new RepoClass();
    }
}

const entityMetadataStore = new EntityMetadataStore();

export default entityMetadataStore;
