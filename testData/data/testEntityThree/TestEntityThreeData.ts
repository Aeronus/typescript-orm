import { HttpMethod } from '../../../src/handler/HandlerInterface';
import GET_TestEntityThree from './GET_TestEntityThree';

export const TestEntityThreeData: Partial<{ [method in HttpMethod]: any }> = {
    GET: GET_TestEntityThree,
};
