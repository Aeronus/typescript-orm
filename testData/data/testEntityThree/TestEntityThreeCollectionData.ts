import { HttpMethod } from '../../../src/handler/HandlerInterface';
import GET_TestEntityThree from './GET_TestEntityThree';

export const TestEntityThreeCollectionData: Partial<{ [method in HttpMethod]: any[] }> = {
    GET: [GET_TestEntityThree],
};
