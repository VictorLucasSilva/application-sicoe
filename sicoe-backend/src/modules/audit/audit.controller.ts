import { Controller, Get, Query } from '@nestjs/common';

import { AuditService } from './audit.service';
import { FilterAuditDto } from './dto/filter-audit.dto';
import { Audit } from './entities/audit.entity';
import { AudAction } from './entities/aud-action.entity';
import { AudObject } from './entities/aud-object.entity';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}


  @Get('actions')
  async findAllActions(): Promise<AudAction[]> {
    return this.auditService.findAllActions();
  }


  @Get('objects')
  async findAllObjects(): Promise<AudObject[]> {
    return this.auditService.findAllObjects();
  }


  @Get('logins')
  async findAllLogins(): Promise<string[]> {
    return this.auditService.findAllLogins();
  }


  @Get()
  async findAll(@Query() filterDto: FilterAuditDto): Promise<{
    data: Audit[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.auditService.findAll(filterDto);
  }
}
