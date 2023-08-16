import { AbstractEntity } from '../entity/AbstractEntity';
import entityMetadataStore from '../EntityMetadataStore';
import { AbstractEntityRepository } from '../repository/AbstractEntityRepository';
import { ClassConstructor } from 'class-transformer';

type EntityDecoratorParams<EntityType extends AbstractEntity, RepositoryType extends AbstractEntityRepository<EntityType>> = {
    repositoryClass: ClassConstructor<RepositoryType>;
};

export function Entity<
    EntityType extends AbstractEntity,
    RepositoryType extends AbstractEntityRepository<EntityType>
>({ repositoryClass }: EntityDecoratorParams<EntityType, RepositoryType>) {
    return function (constructor: ClassConstructor<EntityType>, _context: ClassDecoratorContext<ClassConstructor<EntityType>>) {
        entityMetadataStore.addRepository(constructor, repositoryClass);
    };
}
