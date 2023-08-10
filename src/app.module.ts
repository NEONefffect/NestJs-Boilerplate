import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

import config from "config";
import { CommonModule } from "common/common.module";

console.log(config.DB);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      ...config.DB,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      // logging: true,
    }),
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
