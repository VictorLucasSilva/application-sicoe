import { Controller, Get } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('test')
  async testConnection() {
    return await this.storageService.testConnection();
  }

  @Get('list')
  async listFiles() {
    try {
      const files = await this.storageService.listFiles();
      return {
        success: true,
        files,
        count: files.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
