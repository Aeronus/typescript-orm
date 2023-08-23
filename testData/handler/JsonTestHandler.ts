import { HandleRequestProps, HandlerInterface, HttpMethod } from '../../src/handler/HandlerInterface';
import { EntityData } from '../data/EntityData';

export class JsonTestHandler implements HandlerInterface {
    public handleRequest({ uri, method }: HandleRequestProps): Promise<any> {
        if (uri.endsWith('/')) {
            uri = uri.slice(0, -1);
        }

        if (uri === '') {
            return new Promise((resolve) => resolve(null));
        }

        const uriParts = uri.split('/');

        let lastUriPart = uriParts.pop();

        if (!isNaN(parseInt(lastUriPart || ''))) {
            lastUriPart = uriParts.pop();
        }

        return new Promise((resolve) => {
            switch (lastUriPart) {
                case 'testEntity':
                case 'testEntityThree':
                    resolve(this.getJsonForEntityAndMethod(lastUriPart, method));
                    break;
                default:
                    resolve(null);
            }
        });
    }

    private getJsonForEntityAndMethod(entity: string, method: HttpMethod): any {
        const entityName = `${entity.toLowerCase()}`;

        return EntityData[entityName][method];
    }
}
