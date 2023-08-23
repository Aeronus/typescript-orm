import { HandleRequestProps, HandlerInterface } from './HandlerInterface';

export class LoggerHandler implements HandlerInterface {
    public handleRequest<ReturnType>({ uri, method, options }: HandleRequestProps): Promise<ReturnType | null> {
        console.log(`[LoggerHandler][handleRequest] URI: ${uri}`);
        console.log(`[LoggerHandler][handleRequest] Method: ${method}`);
        console.log(`[LoggerHandler][handleRequest] Options`, JSON.stringify(options || {}));
        console.warn(
            'Please change the handler in the EntityManager: EntityManager.setEntityHandler(handler: HandlerInterface)',
        );

        return new Promise((resolve) => resolve(null));
    }
}
