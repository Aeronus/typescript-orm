import EntityManager from '../src/EntityManager';
import { TestEntity } from '../testData/entity/TestEntity';
import { TestEntityRepository } from '../testData/repository/TestEntityRepository';
import { TestEntityNoRepo } from '../testData/entity/TestEntityNoRepo';

describe('EntityDecorator', () => {
    it('define repository', () => {
        const repo = EntityManager.getRepository(TestEntity);
        expect(repo).toBeInstanceOf(TestEntityRepository);
    });
    it('throw error when no repository defined', () => {
        expect(() => {
            EntityManager.getRepository(TestEntityNoRepo);
        }).toThrow();
    });
});
