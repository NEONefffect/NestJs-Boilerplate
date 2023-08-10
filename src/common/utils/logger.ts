import { ConsoleLogger } from '@nestjs/common';

import { StorageService } from 'common/services/storage.service';

export class AppLogger extends ConsoleLogger {
  private storageService: StorageService;

  constructor(context?: string) {
    super(context);
    this.storageService = new StorageService();
  }
}
