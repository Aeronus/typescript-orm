import { HandleRequestProps, HandlerInterface } from './HandlerInterface';
import { UnknownError } from '../errors/UnknownError';
import { InvalidInputError } from '../errors/InvalidInputError';
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError';
import { RessourceNotFoundError } from '../errors/RessourceNotFoundError';

export default class implements HandlerInterface {
    public handleRequest({ uri, method, options, data }: HandleRequestProps): Promise<any> {
        return new Promise((resolve, reject) => {
            const requestInit = this.getFetchOptions(options);
            requestInit.method = method;

            if (data) {
                requestInit.body = JSON.stringify(data);
                requestInit.headers = {
                    'Content-Type': 'application/json',
                };
            }

            const response = fetch(uri, requestInit);
            response
                .then((response) => {
                    if (response.ok) {
                        resolve(response.json());
                        return;
                    }

                    switch (response.status) {
                        case 400:
                            reject(new InvalidInputError(response.json(), data));
                            break;
                        case 404:
                            reject(new RessourceNotFoundError(response.json(), data));
                            break;
                        case 422:
                            reject(new UnprocessableEntityError(response.json(), data));
                            break;
                        default:
                            reject(new UnknownError(response.json()));
                    }
                })
                .catch((err) => {
                    reject(new UnknownError(err));
                });
        });
    }

    private getFetchOptions(options: { [option: string]: any }) {
        const fetchOptions: RequestInit = {};

        const optionKeys = Object.keys(options);

        optionKeys.forEach((optionsKey) => {
            switch (optionsKey) {
                case 'signal':
                    fetchOptions.signal = options.signal;
                    break;
            }
        });

        return fetchOptions;
    }
}
