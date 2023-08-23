import EntityManager from '../src/EntityManager';
import { TestEntity } from '../testData/entity/TestEntity';
import { TestEntityRepository } from '../testData/repository/TestEntityRepository';
import { JsonTestHandler } from '../testData/handler/JsonTestHandler';
import { LoggerHandler } from '../src/handler/LoggerHandler';
import { TestEntityTwo } from '../testData/entity/TestEntityTwo';
import { TestEntityTwoRepository } from '../testData/repository/TestEntityTwoRepository';
import { TestEntityThree } from '../testData/entity/TestEntityThree';
import { TestEntityThreeRepository } from '../testData/repository/TestEntityThreeRepository';
import { TestEntityFour } from '../testData/entity/TestEntityFour';

beforeEach(() => {
    EntityManager.setEntityHandler(new LoggerHandler());
});
describe('EntityManager', () => {
    it('repository handle request with default handler', () => {
        const repo: TestEntityRepository = EntityManager.getRepository(TestEntity);
        expect(repo.get(0)).resolves.toBeNull();
    });
    it('repository handle raw request with default handler', () => {
        const repo: TestEntityRepository = EntityManager.getRepository(TestEntity);
        expect(repo.customRouteRawRequest(0)).resolves.toBeNull();
    });
    it('repository handle request with custom handler', async () => {
        EntityManager.setEntityHandler(new JsonTestHandler());
        const repo: TestEntityRepository = EntityManager.getRepository(TestEntity);
        const entity = await repo.get(0);

        expect(entity).toBeInstanceOf(TestEntity);
        expect(entity?.birthDay).toBeInstanceOf(Date);
        expect(entity?.name).toBe('Max Mustermann');
        expect(entity?.age).toBe(24);
    });
    it('repository handle request with custom handler and slash at the end of uri', async () => {
        EntityManager.setEntityHandler(new JsonTestHandler());
        const repo: TestEntityRepository = EntityManager.getRepository(TestEntity);
        const entity = await repo.customRouteUriWithSlash(0);

        expect(entity).toBeInstanceOf(TestEntity);
        expect(entity?.birthDay).toBeInstanceOf(Date);
        expect(entity?.name).toBe('Max Mustermann');
        expect(entity?.age).toBe(24);
    });
    it('repository handle request with custom handler and empty uri', async () => {
        EntityManager.setEntityHandler(new JsonTestHandler());
        const repo: TestEntityRepository = EntityManager.getRepository(TestEntity);
        const entity = await repo.customRouteEmptyUri();

        expect(entity).toBeNull();
    });
    it('repository handle request with custom handler and unknown entity', async () => {
        EntityManager.setEntityHandler(new JsonTestHandler());
        const repo: TestEntityTwoRepository = EntityManager.getRepository(TestEntityTwo);
        const entity = await repo.get(0);

        expect(entity).toBeNull();
    });
    it('repository handle request with custom handler and nested entity', async () => {
        EntityManager.setEntityHandler(new JsonTestHandler());
        const repo: TestEntityThreeRepository = EntityManager.getRepository(TestEntityThree);
        const entity = await repo.get(0);

        expect(entity).toBeInstanceOf(TestEntityThree);
        expect(entity?.birthDay).toBeInstanceOf(Date);
        expect(entity?.name).toBe('Max Mustermann');
        expect(entity?.age).toBe(24);
        expect(entity?.nestedEntity).toBeInstanceOf(TestEntityFour);
        expect(entity?.nestedEntity.birthDay).toBeInstanceOf(Date);
        expect(entity?.nestedEntity.name).toBe('Max Mustermann');
        expect(entity?.nestedEntity.age).toBe(24);
    });
});
