import { Entity } from '../../src/decorator/EntityDecorator';
import { EntityInterface } from '../../src/entity/EntityInterface';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { TestEntityFourRepository } from '../repository/TestEntityFourRepository';

@Entity({ repositoryClass: TestEntityFourRepository, baseUri: '/test/api/testEntityFour' })
export class TestEntityFour implements EntityInterface {
    public name: string;

    public age: number;

    @Type(() => Date)
    public birthDay: Date;
}
