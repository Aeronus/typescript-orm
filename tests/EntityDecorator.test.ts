import EntityManager from '../src/EntityManager';
import { TestEntity } from '../testData/entity/TestEntity';
import { TestEntityRepository } from '../testData/repository/TestEntityRepository';
import { TestEntityNoMetadata } from '../testData/entity/TestEntityNoMetadata';
import entityMetadataStore from '../src/metadata/EntityMetadataStore';

describe('EntityDecorator', () => {
    it('define repository', () => {
        const repo = EntityManager.getRepository(TestEntity);
        expect(repo).toBeInstanceOf(TestEntityRepository);
    });
    it('throw error when no repository defined', () => {
        expect(() => {
            EntityManager.getRepository(TestEntityNoMetadata);
        }).toThrow();
    });
    it('sets base uri', () => {
        const baseUri = entityMetadataStore.getBaseUri(TestEntity);
        expect(baseUri).toBe('/test/api/testEntity');
    });
    it('sets no base uri', () => {
        const baseUri = entityMetadataStore.getBaseUri(TestEntityNoMetadata);
        expect(baseUri).toBeNull();
    });
});
