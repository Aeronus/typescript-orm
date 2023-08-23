import { HttpMethod } from '../../../src/handler/HandlerInterface';
import GET_TestEntityFour from './GET_TestEntityFour';

export const TestEntityFourData: Partial<{ [method in HttpMethod]: any }> = {
    GET: GET_TestEntityFour,
};
