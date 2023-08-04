import { HandlerInterface } from './HandlerInterface';
import { Serializable } from '../types/Serializable';
import axios from 'axios';
import { UnexpectedError } from '../error/UnexpectedError';
import { EntityNotFoundError } from '../error/EntityNotFoundError';
import { InvalidInputError } from '../error/InvalidInputError';
import { UnprocessableEntityError } from '../error/UnprocessableEntityError';
import { MissingParameterError } from '../error/MissingParameterError';

export class ApiPlatformHandler implements HandlerInterface {
    public async delete(id: string, options?: { [p: string]: any }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const url = this.getUrl(id, options);

            axios
                .delete<void>(url)
                .then((response) => {
                    switch (response.status) {
                        case 204:
                            resolve(true);
                            break;
                        case 404:
                            reject(new EntityNotFoundError(id));
                            break;
                        default:
                            reject(new UnexpectedError(`Unhandled response code: ${response.status}`));
                    }
                });
        });
    }

    public get<
        ReturnDataType extends Serializable
    >(id: string, options?: { [p: string]: any }): Promise<ReturnDataType> {
        return new Promise((resolve, reject) => {
            const url = this.getUrl(id, options);

            axios
                .get<ReturnDataType>(url)
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            resolve(response.data);
                            break;
                        case 404:
                            reject(new EntityNotFoundError(id));
                            break;
                        default:
                            reject(new UnexpectedError(`Unhandled response code: ${response.status}`));
                            break;
                    }
                });
        });
    }

    public patch<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(id: string, data: Partial<CreateDataType>, options?: { [p: string]: any }): Promise<ReturnDataType> {
        return new Promise((resolve, reject) => {
            const url = this.getUrl(id, options);

            axios
                .patch<ReturnDataType>(url, data)
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            resolve(response.data);
                            break;
                        case 400:
                            reject(new InvalidInputError(data));
                            break;
                        case 404:
                            reject(new EntityNotFoundError(id));
                            break;
                        case 422:
                            reject(new UnprocessableEntityError(data));
                            break;
                        default:
                            reject(new UnexpectedError(`Unhandled response code: ${response.status}`));
                            break;
                    }
                });
        });
    }

    public post<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(data: CreateDataType, options: { [p: string]: any }): Promise<ReturnDataType> {
        return new Promise((resolve, reject) => {
            if (!options || !options.baseUri ) {
                reject(new MissingParameterError('baseUri'));
            }

            const url = this.getUrl(options.baseUrl, options);

            axios
                .post<ReturnDataType>(url, data)
                .then((response) => {
                    switch (response.status) {
                        case 201:
                            resolve(response.data);
                            break;
                        case 400:
                            reject(new InvalidInputError(data));
                            break;
                        case 422:
                            reject(new UnprocessableEntityError(data));
                            break;
                        default:
                            reject(new UnexpectedError(`Unhandled response code: ${response.status}`));
                            break;
                    }
                });
        });
    }

    public put<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(id: string, data: CreateDataType, options?: { [p: string]: any }): Promise<ReturnDataType> {
        return new Promise((resolve, reject) => {
            const url = this.getUrl(id, options);

            axios
                .put<ReturnDataType>(url, data)
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            resolve(response.data);
                            break;
                        case 400:
                            reject(new InvalidInputError(data));
                            break;
                        case 404:
                            reject(new EntityNotFoundError(id));
                            break;
                        case 422:
                            reject(new UnprocessableEntityError(data));
                            break;
                        default:
                            reject(new UnexpectedError(`Unhandled response code: ${response.status}`));
                            break;
                    }
                });
        });
    }

    protected getUrl(id: string, options?: { [key: string]: any }): string {
        let url = id;

        if (options && options.baseUrl) {
            url = `${options.baseUrl}${id}`;
        }

        return url;
    }
}
