import EntityManager from '../src/EntityManager';
import { ApiPlatformHandler } from '../src/handler/ApiPlatformHandler';
import fetchMock from 'jest-fetch-mock';
import { TestEntity } from '../testData/TestEntity';

beforeAll(() => {
    fetchMock.enableMocks();
});

beforeEach(() => {
    EntityManager.setHandler(new ApiPlatformHandler());
    fetchMock.resetMocks();
});

describe(
    'api platform handler test',
    () => {
        it(
            "returns entity_one for id /api/testEntity/1",
            () => {
                const repo = EntityManager.getRepository(TestEntity);

            }
        )
    },
);