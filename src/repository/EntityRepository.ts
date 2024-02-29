import { EntityInterface } from '../entity/EntityInterface';
import { HandleRequestProps } from '../handler/HandlerInterface';
import EntityManager, { HandleRequestParams } from '../EntityManager';

// @ts-ignore
export abstract class EntityRepository<EntityType extends EntityInterface> {
    constructor(private baseUri?: string) {}

    protected getUriFromEntity(id?: string | number): string {
        let uri = this.baseUri || '';

        if (id !== undefined) {
            uri = `${uri}/${id}`;
        }

        return uri;
    }

    protected async handleRequest<ReturnType>({
        options,
        typeConstructor,
        convertOptions = {},
        useValidation = false,
        validationOptions = {},
    }: HandleRequestParams<ReturnType>): Promise<ReturnType | null> {
        return EntityManager.handleRequest({
            options,
            typeConstructor,
            convertOptions,
            validationOptions,
            useValidation,
        });
    }

    protected async handleCollectionRequest<ReturnType>({
        options,
        typeConstructor,
        convertOptions = {},
        useValidation = true,
        validationOptions = {},
    }: HandleRequestParams<ReturnType>): Promise<ReturnType[] | null> {
        return EntityManager.handleCollectionRequest({
            options,
            typeConstructor,
            convertOptions,
            validationOptions,
            useValidation,
        });
    }

    protected handleRawRequest(options: HandleRequestProps) {
        return EntityManager.handleRawRequest(options);
    }
}
