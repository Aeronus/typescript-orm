import { Entity } from '../../src/decorator/EntityDecorator';
import { EntityInterface } from '../../src/entity/EntityInterface';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { TestEntityFour } from './TestEntityFour';
import { TestEntityThreeRepository } from '../repository/TestEntityThreeRepository';

@Entity({ repositoryClass: TestEntityThreeRepository, baseUri: '/test/api/testEntityThree' })
export class TestEntityThree implements EntityInterface {
    public name: string;

    public age: number;

    @Type(() => Date)
    public birthDay: Date;

    @Type(() => TestEntityFour)
    public nestedEntity: TestEntityFour;
}
