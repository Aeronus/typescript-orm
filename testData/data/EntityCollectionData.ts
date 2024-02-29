import { HttpMethod } from '../../src/handler/HandlerInterface';
import { TestEntityCollectionData } from './testEntity/TestEntityCollectionData';
import { TestEntityThreeCollectionData } from './testEntityThree/TestEntityThreeCollectionData';
import { TestEntityFourCollectionData } from './testEntityFour/TestEntityFourCollectionData';

export const EntityCollectionData: { [entityName: string]: Partial<{ [methodName in HttpMethod]: any[] }> } = {
    testentity: TestEntityCollectionData,
    testentitythree: TestEntityThreeCollectionData,
    testentityfour: TestEntityFourCollectionData,
};
