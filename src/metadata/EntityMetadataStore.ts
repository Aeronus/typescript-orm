import { v5 as uuidv5 } from 'uuid';
import { EntityInterface } from '../entity/EntityInterface';
import { EntityRepository } from '../repository/EntityRepository';
import { ClassConstructor } from 'class-transformer';

type EntityMetadata<EntityType extends EntityInterface> = {
    repositoryClass?: ClassConstructor<EntityRepository<EntityType>>;
    baseUri?: string;
};

const META_DATASTORE_WORKSPACE = 'f21e9b33-2790-49db-91a1-34414da92619';

class EntityMetadataStore {
    private entityMetadata: { [entityName: string]: EntityMetadata<EntityInterface> } = {};

    /**
     * Add a new entity and it's metadata
     *
     * @template EntityType Type of the entity
     * @param {ClassConstructor<EntityType>} entity entity class
     * @param {EntityMetadata<EntityType>} metaData entity metadata
     */
    public addEntity<EntityType extends EntityInterface>(
        entity: ClassConstructor<EntityType>,
        metaData: EntityMetadata<EntityType>,
    ) {
        this.setEntityMetadata(entity, metaData);
    }

    /**
     * Returns an instance of the repository for an entity
     *
     * @template EntityType Type of the entity
     * @param {ClassConstructor<EntityType>} entity Entity class
     * @returns {EntityRepository<EntityType> | null} Repository instance if one is declared otherwise null
     */
    public getRepository<EntityType extends EntityInterface, RepositoryType extends EntityRepository<EntityType>>(
        entity: ClassConstructor<EntityType>,
    ): RepositoryType | null {
        const metadata = this.getEntityMetadata(entity);

        if (!Object.keys(metadata).includes('repositoryClass') || typeof metadata.repositoryClass != 'function') {
            return null;
        }

        const RepoClass = metadata.repositoryClass;
        const baseUri = this.getBaseUri(entity);

        // @ts-ignore
        return new RepoClass(baseUri);
    }

    /**
     * Returns the base uri declared for the entity
     *
     * @template EntityType Type of the entity
     * @param {ClassConstructor<EntityType>} entity Entity class
     * @returns {string | null} Base uri if one was stored otherwise null
     */
    public getBaseUri<EntityType extends EntityInterface>(entity: ClassConstructor<EntityType>): string | null {
        return this.getEntityMetadata(entity).baseUri || null;
    }

    /**
     * Returns the metadata for an entity
     *
     * @template EntityType Type of the entity
     * @param {ClassConstructor<EntityType>} entity Entity class
     * @returns {EntityMetadata<EntityInterface>} Metadata object stored in the store
     * @private
     */
    private getEntityMetadata<EntityType extends EntityInterface>(
        entity: ClassConstructor<EntityType>,
    ): EntityMetadata<EntityInterface> {
        const entityName = entity.name;
        const uuid = uuidv5(entityName, META_DATASTORE_WORKSPACE);

        if (!Object.keys(this.entityMetadata).includes(uuid)) {
            this.entityMetadata[uuid] = {};
        }

        return this.entityMetadata[uuid];
    }

    /**
     * Set the metadata for an entity
     *
     * @template EntityType Type of the entity
     * @param {ClassConstructor<EntityType>} entity entity class
     * @param {EntityMetadata<EntityType>} metadata entity metadata
     * @private
     */
    private setEntityMetadata<EntityType extends EntityInterface>(
        entity: ClassConstructor<EntityType>,
        metadata: EntityMetadata<EntityType>,
    ) {
        const entityName = entity.name;
        const uuid = uuidv5(entityName, META_DATASTORE_WORKSPACE);
        this.entityMetadata[uuid] = metadata;
    }
}

const entityMetadataStore = new EntityMetadataStore();

export default entityMetadataStore;
