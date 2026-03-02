import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
import { Audit } from './entities/audit.entity';
import { AudAction } from './entities/aud-action.entity';
import { AudObject } from './entities/aud-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audit, AudAction, AudObject])],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService, TypeOrmModule],
})
export class AuditModule {}
