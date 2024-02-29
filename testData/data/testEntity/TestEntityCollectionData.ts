import GET_TestEntity from './GET_TestEntity';
import { HttpMethod } from '../../../src/handler/HandlerInterface';

export const TestEntityCollectionData: Partial<{ [method in HttpMethod]: any[] }> = {
    GET: [GET_TestEntity],
};
