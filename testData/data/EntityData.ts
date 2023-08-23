import { TestEntityData } from './testEntity/TestEntityData';
import { HttpMethod } from '../../src/handler/HandlerInterface';
import { TestEntityThreeData } from './testEntityThree/TestEntityThreeData';
import { TestEntityFourData } from './testEntityFour/TestEntityFourData';

export const EntityData: { [entityName: string]: Partial<{ [methodName in HttpMethod]: any }> } = {
    testentity: TestEntityData,
    testentitythree: TestEntityThreeData,
    testentityfour: TestEntityFourData,
};
