import { EntityRepository } from '../../src/repository/EntityRepository';
import { TestEntityTwo } from '../entity/TestEntityTwo';

export class TestEntityTwoRepository extends EntityRepository<TestEntityTwo> {
    public get(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRequest({ options: { uri, method: 'GET' }, typeConstructor: TestEntityTwo });
    }

    public getCollection() {
        const uri = this.getUriFromEntity();

        return this.handleCollectionRequest({ options: { uri, method: 'GET' }, typeConstructor: TestEntityTwo });
    }
}
