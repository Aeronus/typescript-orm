import { Entity } from '../../src/decorator/EntityDecorator';
import { EntityInterface } from '../../src/entity/EntityInterface';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { TestEntityTwoRepository } from '../repository/TestEntityTwoRepository';

@Entity({ repositoryClass: TestEntityTwoRepository, baseUri: '/test/api/testEntityTwo' })
export class TestEntityTwo implements EntityInterface {
    public name: string;

    public age: number;

    @Type(() => Date)
    public birthDay: Date;
}
