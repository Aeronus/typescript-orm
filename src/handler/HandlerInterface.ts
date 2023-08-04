import { Serializable } from '../types/Serializable';

export interface HandlerInterface {
    /**
     * Get a single entity
     * @param {string} id The id of the entity
     * @param {{[p: string]: any}} options The options for the handler
     * @returns {Serializable}
     */
    get<
        ReturnDataType extends Serializable
    >(id: string, options?: { [k: string]: any }): Promise<ReturnDataType>;

    post<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(data: CreateDataType, options?: { [k: string]: any }): Promise<ReturnDataType>;

    put<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(id: string, data: CreateDataType, options?: { [k: string]: any }): Promise<ReturnDataType>;

    delete(id: string, options?: { [k: string]: any }): Promise<boolean>;

    patch<
        CreateDataType extends Serializable,
        ReturnDataType extends Serializable
    >(id: string, data: Partial<CreateDataType>, options?: { [k: string]: any }): Promise<ReturnDataType>;
}