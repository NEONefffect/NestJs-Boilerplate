import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class EntityService<EntityType> {
  protected abstract _repository: Repository<EntityType>;

  get repository() {
    return this._repository;
  }

  get queryBuilder() {
    return this._repository.createQueryBuilder();
  }

  async findAll(options?: FindManyOptions<EntityType>) {
    return await this._repository.find(options);
  }

  findOne(options: FindOneOptions<EntityType>) {
    return this._repository.findOne(options);
  }

  findById(id: number) {
    return this._repository.findOneBy({
      id,
    } as unknown as FindOptionsWhere<EntityType>);
  }

  async create(data: DeepPartial<EntityType>) {
    const entity = this._repository.create(data);
    await this._repository.save(data);
    return entity;
  }

  async update(id: number, data: QueryDeepPartialEntity<EntityType>) {
    return await this.repository.update(id, data);
  }

  async bulkUpdate(
    filters: string[] | number[] | FindOptionsWhere<EntityType>,
    data: QueryDeepPartialEntity<EntityType>,
  ) {
    return await this.repository.update(filters, data);
  }

  bulkUpdateBuilder(values: QueryDeepPartialEntity<EntityType>) {
    return this._repository.createQueryBuilder().update().set(values);
  }

  delete(
    filters:
      | string
      | string[]
      | number
      | number[]
      | FindOptionsWhere<EntityType>,
  ) {
    return this._repository.delete(filters);
  }

  findOneByIdOrFail(id: number) {
    return this._repository.findOneByOrFail({
      id,
    } as unknown as FindOptionsWhere<EntityType>);
  }
  findOneOrFail(options: FindOptionsWhere<EntityType>) {
    return this._repository.findOneByOrFail(options);
  }
}
