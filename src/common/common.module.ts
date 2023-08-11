import { Global, Module } from "@nestjs/common";
import { EmailsService } from "./services/emails.service";
import { StorageService } from "./services/storage.service";

@Global()
@Module({
  providers: [EmailsService, StorageService],
  exports: [EmailsService, StorageService],
})
export class CommonModule {}
