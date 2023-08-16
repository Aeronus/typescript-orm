import { HandleRequestProps, HandlerInterface } from './HandlerInterface';

export class LoggerHandler implements HandlerInterface {
    public handleRequest<ReturnType>({ uri, method, options }: HandleRequestProps): Promise<ReturnType | null> {
        console.log(`[LoggerHandler] URI: ${uri}`);
        console.log(`[LoggerHandler] Method: ${method}`);
        console.log(`[LoggerHandler] Options`, options);

        return new Promise((resolve) => resolve(null));
    }
}
