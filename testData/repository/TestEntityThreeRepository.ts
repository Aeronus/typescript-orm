import { EntityRepository } from '../../src/repository/EntityRepository';
import { TestEntityThree } from '../entity/TestEntityThree';

export class TestEntityThreeRepository extends EntityRepository<TestEntityThree> {
    public get(id: string | number) {
        const uri = this.getUriFromEntity(id);

        return this.handleRequest<TestEntityThree>({
            options: { uri, method: 'GET' },
            typeConstructor: TestEntityThree,
        });
    }
}
