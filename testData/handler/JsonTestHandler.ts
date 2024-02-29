import { HandleRequestProps, HandlerInterface, HttpMethod } from '../../src/handler/HandlerInterface';
import { EntityData } from '../data/EntityData';
import { EntityCollectionData } from '../data/EntityCollectionData';

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
        let isCollection = true;

        if (!isNaN(parseInt(lastUriPart || ''))) {
            lastUriPart = uriParts.pop();
            isCollection = false;
        }

        return new Promise((resolve) => {
            switch (lastUriPart) {
                case 'testEntity':
                case 'testEntityThree':
                    resolve(this.getJsonForEntityAndMethod(lastUriPart, method, isCollection));
                    break;
                default:
                    resolve(null);
            }
        });
    }

    private getJsonForEntityAndMethod(entity: string, method: HttpMethod, isCollection: boolean): any {
        const entityName = `${entity.toLowerCase()}`;

        return isCollection ? EntityCollectionData[entityName][method] : EntityData[entityName][method];
    }
}
