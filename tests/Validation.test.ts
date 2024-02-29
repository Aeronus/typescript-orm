import EntityManager from '../src/EntityManager';
import { TestEntity } from '../testData/entity/TestEntity';
import { TestEntityRepository } from '../testData/repository/TestEntityRepository';
import { LoggerHandler } from '../src/handler/LoggerHandler';

beforeEach(() => {
    EntityManager.setEntityHandler(new LoggerHandler());
});
describe('EntityManager', () => {
    it('repository handle request with default handler', () => {
        const repo: TestEntityRepository = EntityManager.getRepository(TestEntity);
        expect(repo.get(0)).resolves.toBeNull();
    });
});
