import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { AbstractEntity } from '../entity/AbstractEntity';
import { EntityValidationError } from '../error/EntityValidationError';
import { HandlerInterface } from '../handler/HandlerInterface';
import { Serializable } from '../types/Serializable';

export class AbstractEntityRepository<EntityType extends AbstractEntity> {
    private readonly entityType: { new(): EntityType };
    protected readonly handler: HandlerInterface;

    constructor(entityType: { new(): EntityType }, handler: HandlerInterface) {
        this.entityType = entityType;
        this.handler = handler;

        console.log(this.entityType);
    }

    protected createEntityFromData<DataType extends { [key: string]: any }>(data: DataType): EntityType {
        const instance: EntityType = plainToInstance<EntityType, DataType>(this.entityType, data);
        const errors = validateSync(instance);

        if (errors.length > 0) {
            throw new EntityValidationError(this.entityType, errors);
        }

        return instance;
    }

    protected getEntity<
        SerializableEntityType extends Serializable
    >(id: string, handlerOptions?: { [k: string]: any }) {
        return this.createEntityFromData(this.handler.get<SerializableEntityType>(id, handlerOptions));
    }

    protected postEntity<
        SerializableEntityType extends Serializable
    >(data: SerializableEntityType, handlerOptions?: { [k: string]: any }): EntityType {
        return this.createEntityFromData(this.handler.post(data, handlerOptions));
    }

    protected putEntity<
        SerializableEntityType extends Serializable
    >(id: string, data: SerializableEntityType, handlerOptions?: { [k: string]: any }): EntityType {
        return this.createEntityFromData(this.handler.put(id, data, handlerOptions));
    }

    protected deleteEntity(id: string, handlerOptions?: { [k: string]: any }): boolean {
        return this.handler.delete(id, handlerOptions);
    }

    protected patchEntity<
        SerializableEntityType extends Serializable
    >(id: string, data: Partial<SerializableEntityType>, handlerOptions?: { [k: string]: any }): EntityType {
        return this.createEntityFromData(this.handler.patch(id, data, handlerOptions));
    }
}
