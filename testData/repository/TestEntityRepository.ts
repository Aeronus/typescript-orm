import { EntityRepository } from '../../src/repository/EntityRepository';
import { TestEntity } from '../entity/TestEntity';

export class TestEntityRepository extends EntityRepository<TestEntity> {
    public get(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRequest<TestEntity>({ uri, method: 'GET' }, TestEntity, { excludeExtraneousValues: false });
    }

    public customRouteRawRequest(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRawRequest({ uri, method: 'GET' });
    }

    public customRouteUriWithSlash(id: string | number) {
        const uri = `${this.getUriFromEntity(id)}/`;

        return this.handleRequest({ uri, method: 'GET' }, TestEntity);
    }

    public customRouteEmptyUri(): Promise<TestEntity | null> {
        const uri = '';

        return this.handleRequest({ uri, method: 'GET' }, TestEntity);
    }
}
