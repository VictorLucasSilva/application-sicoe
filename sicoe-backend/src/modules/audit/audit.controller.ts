import { Controller, Get, Query } from '@nestjs/common';

import { AuditService } from './audit.service';
import { FilterAuditDto } from './dto/filter-audit.dto';
import { Audit } from './entities/audit.entity';
import { AudAction } from './entities/aud-action.entity';
import { AudObject } from './entities/aud-object.entity';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  /**
   * GET /audit/actions
   * Listar todas as ações disponíveis
   * IMPORTANTE: Deve vir ANTES da rota GET /audit
   */
  @Get('actions')
  async findAllActions(): Promise<AudAction[]> {
    return this.auditService.findAllActions();
  }

  /**
   * GET /audit/objects
   * Listar todos os objetos disponíveis
   * IMPORTANTE: Deve vir ANTES da rota GET /audit
   */
  @Get('objects')
  async findAllObjects(): Promise<AudObject[]> {
    return this.auditService.findAllObjects();
  }

  /**
   * GET /audit/logins
   * Listar todos os logins únicos de auditoria
   * IMPORTANTE: Deve vir ANTES da rota GET /audit
   */
  @Get('logins')
  async findAllLogins(): Promise<string[]> {
    return this.auditService.findAllLogins();
  }

  /**
   * GET /audit
   * Listar logs de auditoria
   * Todos os grupos podem acessar (somente leitura)
   */
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
