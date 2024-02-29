import { EntityRepository } from '../../src/repository/EntityRepository';
import { TestEntity } from '../entity/TestEntity';

export class TestEntityRepository extends EntityRepository<TestEntity> {
    public get(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRequest<TestEntity>({
            options: { uri, method: 'GET' },
            typeConstructor: TestEntity,
            convertOptions: { excludeExtraneousValues: false },
        });
    }

    public getCollection() {
        const uri = this.getUriFromEntity();

        return this.handleCollectionRequest({ options: { uri, method: 'GET' }, typeConstructor: TestEntity });
    }

    public customRouteRawRequest(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRawRequest({ uri, method: 'GET' });
    }

    public customRouteUriWithSlash(id: string | number) {
        const uri = `${this.getUriFromEntity(id)}/`;

        return this.handleRequest({ options: { uri, method: 'GET' }, typeConstructor: TestEntity });
    }

    public customRouteEmptyUri(): Promise<TestEntity | null> {
        const uri = '';

        return this.handleRequest({ options: { uri, method: 'GET' }, typeConstructor: TestEntity });
    }
}
