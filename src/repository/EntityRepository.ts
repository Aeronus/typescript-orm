import { EntityInterface } from '../entity/EntityInterface';
import { HandleRequestProps } from '../handler/HandlerInterface';
import { ClassConstructor } from 'class-transformer';
import { ClassTransformOptions } from 'class-transformer/types/interfaces/class-transformer-options.interface';
import EntityManager from '../EntityManager';

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

    protected async handleRequest<ReturnType>(
        options: HandleRequestProps,
        typeConstructor: ClassConstructor<ReturnType>,
        convertOptions: ClassTransformOptions = {
            excludeExtraneousValues: false,
        },
    ): Promise<ReturnType | null> {
        return EntityManager.handleRequest(options, typeConstructor, convertOptions);
    }

    protected handleRawRequest(options: HandleRequestProps) {
        return EntityManager.handleRawRequest(options);
    }
}
