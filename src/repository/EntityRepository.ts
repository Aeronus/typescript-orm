import { EntityInterface } from '../entity/EntityInterface';

// @ts-ignore
export abstract class EntityRepository<EntityType extends EntityInterface> {}
export abstract class EntityRepository<EntityType extends EntityInterface> {
    constructor(private baseUri?: string) {}

    protected getUriFromEntity(id?: string | number): string {
        let uri = this.baseUri || '';

        if (id !== undefined) {
            uri = `${uri}/${id}`;
        }

        return uri;
    }
}
