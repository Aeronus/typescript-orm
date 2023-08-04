import { AbstractEntity } from '../entity/AbstractEntity';
import entityMetadataStore from '../EntityMetadataStore';
import { AbstractEntityRepository } from '../repository/AbstractEntityRepository';

type EntityDecoratorParams<EntityType extends AbstractEntity> = {
    repositoryClass: typeof AbstractEntityRepository<EntityType>;
};

export function Entity<EntityType extends AbstractEntity>({ repositoryClass }: EntityDecoratorParams<EntityType>) {
    return function (constructor: { new(): EntityType }, _context: ClassDecoratorContext<{ new(): EntityType }>) {
        entityMetadataStore.addRepository(constructor, repositoryClass);
    };
}
