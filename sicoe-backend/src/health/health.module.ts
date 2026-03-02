import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { StorageModule } from '../modules/storage/storage.module';

@Module({
  imports: [TypeOrmModule, StorageModule],
  controllers: [HealthController],
})
export class HealthModule {}
