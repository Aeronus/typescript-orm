import EntityManager from '../src/EntityManager';
import TestHandler from '../testData/TestHandler';
import { TestEntity } from '../testData/TestEntity';
import { TestRepository } from '../testData/TestRepository';
import TestEntityNoRepo from '../testData/TestEntityNoRepo';

beforeEach(
    () => {
        EntityManager.setHandler(new TestHandler());
    },
);

describe(
    'EntityDecoratorTest',
    () => {
        it(
            'define the correct repository',
            () => {
                const repo = EntityManager.getRepository(TestEntity);
                expect(repo).toBeInstanceOf(TestRepository);
            },
        );
        it(
            'no handler defined',
            () => {
                EntityManager.setHandler(null);
                expect(() => {EntityManager.getRepository(TestEntity);})
                    .toThrow('No handler was set. Please use EntityManager.setHandler() to set a handler.');
            },
        );
        it(
            'no repo defined',
            () => {
                expect(() => {EntityManager.getRepository(TestEntityNoRepo);})
                    .toThrow(`No repository was found for entity ${TestEntityNoRepo.name}`);
            },
        );
    },
);