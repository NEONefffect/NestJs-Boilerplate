import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { EntityService } from "common/abstracts/entity-service.abstract";

@Injectable()
export class UserService extends EntityService<User> {
  constructor(
    @InjectRepository(User)
    protected readonly _repository: Repository<User>,
  ) {
    super();
  }
}
