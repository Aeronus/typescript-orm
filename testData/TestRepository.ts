import { AbstractEntityRepository } from '../src/repository/AbstractEntityRepository';
import { TestEntity } from './TestEntity';
import { Serializable } from '../src/types/Serializable';

export class TestRepository extends AbstractEntityRepository<TestEntity> {
    public get(id: string) {
        return this.getEntity(id);
    }
    public post(data: Serializable) {
        return this.postEntity(data);
    }
    public put(id: string, data: Serializable) {
        return this.putEntity(id, data);
    }
    public delete(id: string) {
        return this.deleteEntity(id);
    }
    public patch(id: string, data: Partial<Serializable>) {
        return this.patchEntity(id, data);
    }
}
