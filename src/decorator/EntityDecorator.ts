import { EntityRepository } from '../repository/EntityRepository';
import { ClassConstructor } from 'class-transformer';
import entityMetadataStore from '../metadata/EntityMetadataStore';
import { EntityInterface } from '../entity/EntityInterface';

type EntityDecoratorParams<EntityType extends EntityInterface, RepositoryType extends EntityRepository<EntityType>> = {
    repositoryClass: ClassConstructor<RepositoryType>;
    baseUri: string;
};

export function Entity<EntityType extends EntityInterface, RepositoryType extends EntityRepository<EntityType>>({
    repositoryClass,
    baseUri,
}: EntityDecoratorParams<EntityType, RepositoryType>) {
    return function (constructor: ClassConstructor<EntityType>) {
        entityMetadataStore.addEntity(constructor, { repositoryClass, baseUri });
    };
}
