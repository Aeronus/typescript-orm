import { EntityRepository } from '../../src/repository/EntityRepository';
import { TestEntityTwo } from '../entity/TestEntityTwo';

export class TestEntityTwoRepository extends EntityRepository<TestEntityTwo> {
    public get(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRequest<TestEntityTwo>({ uri, method: 'GET' }, TestEntityTwo);
    }
}
