import { Controller, Get, Query } from '@nestjs/common';

import { EmailService } from './email.service';
import { FilterEmailDto } from './dto/filter-email.dto';
import { Email } from './entities/email.entity';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * GET /email/types
   * Listar todos os tipos de email disponíveis
   * IMPORTANTE: Deve vir ANTES da rota GET /email
   */
  @Get('types')
  async findAllTypes(): Promise<string[]> {
    return this.emailService.findAllTypes();
  }

  /**
   * GET /email/subjects
   * Listar todos os assuntos de email disponíveis
   * IMPORTANTE: Deve vir ANTES da rota GET /email
   */
  @Get('subjects')
  async findAllSubjects(): Promise<string[]> {
    return this.emailService.findAllSubjects();
  }

  /**
   * GET /email/destinations
   * Listar todos os destinos únicos de email
   * IMPORTANTE: Deve vir ANTES da rota GET /email
   */
  @Get('destinations')
  async findAllDestinations(): Promise<string[]> {
    return this.emailService.findAllDestinations();
  }

  /**
   * GET /email
   * Listar logs de e-mail
   * Todos os grupos podem acessar (somente leitura)
   */
  @Get()
  async findAll(@Query() filterDto: FilterEmailDto): Promise<{
    data: Email[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.emailService.findAll(filterDto);
  }
}
