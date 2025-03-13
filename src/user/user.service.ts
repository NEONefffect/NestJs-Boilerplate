import { Injectable } from "@nestjs/common";

import { User } from "./../database/database-schema";
import { DrizzleService } from "database/drizzle.service";
import { databaseSchema } from "database/database-schema";

// import { EntityService } from "common/abstracts/entity-service.abstract";

@Injectable()
export class UserService {
  constructor(private readonly dbService: DrizzleService) {}

  async findAll() {
    const res = await this.dbService.db.select().from(databaseSchema.users);
    return res;
  }
}
