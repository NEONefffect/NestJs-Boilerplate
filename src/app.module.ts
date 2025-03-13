import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

import config from "config";
import { CommonModule } from "common/common.module";
import { DatabaseModule } from "./database/database.module";

console.log(config.DB);
@Module({
  imports: [
    DatabaseModule.forRoot({
      host: config.DB.host,
      port: config.DB.port,
      user: config.DB.username,
      password: config.DB.password,
      database: config.DB.database,
      ssl: false,
    }),
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
