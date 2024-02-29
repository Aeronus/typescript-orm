import { EntityRepository } from '../../src/repository/EntityRepository';
import { TestEntityFour } from '../entity/TestEntityFour';

export class TestEntityFourRepository extends EntityRepository<TestEntityFour> {
    public get(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRequest<TestEntityFour>({ options: { uri, method: 'GET' }, typeConstructor: TestEntityFour });
    }
}
