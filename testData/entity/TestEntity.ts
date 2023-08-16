import { Entity } from '../../src/decorator/EntityDecorator';
import { TestEntityRepository } from '../repository/TestEntityRepository';
import { EntityInterface } from '../../src/entity/EntityInterface';

@Entity({ repositoryClass: TestEntityRepository })
export class TestEntity implements EntityInterface {}
