import { HandlerInterface } from '../src/handler/HandlerInterface';
import { Serializable } from '../src/types/Serializable';
import { entity_one, entity_two } from './data/TestEntityData';
import { EntityNotFoundError } from '../src/error/EntityNotFoundError';

export default class TestHandler implements HandlerInterface {
    public delete(id: string, options?: { [p: string]: any }): Promise<boolean> {
        return new Promise<boolean>(
            (resolve) => {
                resolve(id in ['1', '2']);
            },
        );
    }

    public get<
        ReturnDataType extends Serializable
    >(id: string, options?: { [p: string]: any }): Promise<ReturnDataType> {
        switch (id) {
            case '1':
                return new Promise<ReturnDataType>(
                    (resolve) => {
                        resolve(entity_one as any);
                    },
                );
            case '2':
                return new Promise<ReturnDataType>(
                    (resolve) => {
                        resolve(entity_two as any);
                    },
                );
            default:
                throw new EntityNotFoundError(id);
        }
    }

    public patch<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(id: string, data: Partial<CreateDataType>, options?: { [p: string]: any }): Promise<ReturnDataType> {
        return undefined;
    }

    public post<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(data: CreateDataType, options?: { [p: string]: any }): Promise<ReturnDataType> {
        return undefined;
    }

    public put<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(id: string, data: CreateDataType, options?: { [p: string]: any }): Promise<ReturnDataType> {
        return undefined;
    }
}
