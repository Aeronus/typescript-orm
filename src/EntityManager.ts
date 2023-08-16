import { ClassConstructor } from 'class-transformer';
import { EntityInterface } from './entity/EntityInterface';
import { EntityRepository } from './repository/EntityRepository';
import entityMetadataStore from './metadata/EntityMetadataStore';

class EntityManagerClass {
    public getRepository<EntityType extends EntityInterface>(
        entityType: ClassConstructor<EntityType>,
    ): EntityRepository<EntityType> {
        const repository = entityMetadataStore.getRepository<EntityType>(entityType);

        if (repository == null) {
            throw new Error(`No repository was found for entity ${entityType.name}`);
        }

        return repository;
    }
}

const EntityManager = new EntityManagerClass();

export default EntityManager;
