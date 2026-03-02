import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { FilterEstablishmentDto } from './dto/filter-establishment.dto';
import { Establishment } from './entities/establishment.entity';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  /**
   * GET /establishments
   * Listar estabelecimentos com filtros
   * Todos os grupos podem acessar
   */
  @Get()
  async findAll(@Query() filterDto: FilterEstablishmentDto): Promise<{
    data: Establishment[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.establishmentService.findAll(filterDto);
  }

  /**
   * GET /establishments/:id
   * Buscar estabelecimento por ID
   * Todos os grupos podem acessar
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Establishment> {
    return this.establishmentService.findOne(id);
  }

  /**
   * POST /establishments
   * Criar novo estabelecimento
   * Apenas Administrador
   */
  @Post()
  @Roles('Administrador')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    return this.establishmentService.create(createEstablishmentDto);
  }

  /**
   * PATCH /establishments/:id
   * Atualizar estabelecimento
   * Apenas Administrador
   */
  @Patch(':id')
  @Roles('Administrador')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    return this.establishmentService.update(id, updateEstablishmentDto);
  }

  /**
   * DELETE /establishments/:id
   * Remover estabelecimento
   * Apenas Administrador
   */
  @Delete(':id')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.establishmentService.remove(id);
  }
}
