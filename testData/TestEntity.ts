import { AbstractEntity } from '../src/entity/AbstractEntity';
import { Entity } from '../src/decorator/EntityDecorator';
import { TestRepository } from './TestRepository';

@Entity({ repositoryClass: TestRepository })
export class TestEntity extends AbstractEntity {
    private id: number;

    private email: string;

    public setId(id: number): void {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getEmail(): string {
        return this.email;
    }
}
