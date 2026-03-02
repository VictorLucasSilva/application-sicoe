import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Public } from '../common/decorators/public.decorator';
import { StorageService } from '../modules/storage/storage.service';

@Controller('health')
export class HealthController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
  ) {}

  @Public()
  @Get()
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'local',
    };
  }

  @Public()
  @Get('db')
  async testDatabase() {
    try {
      await this.dataSource.query('SELECT 1');
      return {
        success: true,
        message: 'PostgreSQL connection successful',
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
      };
    } catch (error) {
      return {
        success: false,
        message: `Database connection failed: ${error.message}`,
      };
    }
  }

  @Public()
  @Get('storage')
  async testStorage() {
    return await this.storageService.testConnection();
  }

  @Public()
  @Get('all')
  async testAll() {
    const dbTest = await this.testDatabase();
    const storageTest = await this.testStorage();

    return {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'local',
      database: dbTest,
      storage: storageTest,
      overall: dbTest.success && storageTest.success ? 'healthy' : 'unhealthy',
    };
  }
}
