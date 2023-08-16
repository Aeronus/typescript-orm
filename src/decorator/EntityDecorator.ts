import { EntityRepository } from '../repository/EntityRepository';
import { ClassConstructor } from 'class-transformer';
import entityMetadataStore from '../metadata/EntityMetadataStore';
import { EntityInterface } from '../entity/EntityInterface';

type EntityDecoratorParams<
    EntityType extends EntityInterface,
    RepositoryType extends EntityRepository<EntityType>,
> = {
    repositoryClass: ClassConstructor<RepositoryType>;
};

export function Entity<
    EntityType extends EntityInterface,
    RepositoryType extends EntityRepository<EntityType>,
>({ repositoryClass }: EntityDecoratorParams<EntityType, RepositoryType>) {
    return function (
        constructor: ClassConstructor<EntityType>,
        _context: ClassDecoratorContext<ClassConstructor<EntityType>>,
    ) {
        entityMetadataStore.addRepository(constructor, repositoryClass);
    };
}
