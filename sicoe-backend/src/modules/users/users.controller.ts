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

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { AddGroupDto } from './dto/add-group.dto';
import { AddEstablishmentDto } from './dto/add-establishment.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users/logins
   * Listar todos os logins únicos
   * Todos os grupos podem acessar
   */
  @Get('logins')
  async getLogins(): Promise<string[]> {
    return this.usersService.getLogins();
  }

  /**
   * GET /users
   * Listar usuários com filtros e paginação
   * Todos os grupos podem acessar
   */
  @Get()
  async findAll(@Query() filterDto: FilterUserDto): Promise<{
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.usersService.findAll(filterDto);
  }

  /**
   * GET /users/:id
   * Buscar usuário por ID
   * Todos os grupos podem acessar
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  /**
   * POST /users
   * Criar novo usuário
   * Apenas Administrador
   */
  @Post()
  @Roles('Administrador')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  /**
   * PATCH /users/:id
   * Atualizar usuário
   * Apenas Administrador
   */
  @Patch(':id')
  @Roles('Administrador')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * DELETE /users/:id
   * Soft delete (desativar usuário)
   * Apenas Administrador
   */
  @Delete(':id')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }

  /**
   * POST /users/:id/groups
   * Adicionar grupo ao usuário
   * Apenas Administrador
   */
  @Post(':id/groups')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async addGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() addGroupDto: AddGroupDto,
  ): Promise<{ message: string }> {
    return this.usersService.addGroup(id, addGroupDto.groupId);
  }

  /**
   * DELETE /users/:id/groups/:groupId
   * Remover grupo do usuário
   * Apenas Administrador
   */
  @Delete(':id/groups/:groupId')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async removeGroup(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<{ message: string }> {
    return this.usersService.removeGroup(id, groupId);
  }

  /**
   * POST /users/:id/establishments
   * Adicionar estabelecimento ao usuário
   * Apenas Administrador
   */
  @Post(':id/establishments')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async addEstablishment(
    @Param('id', ParseIntPipe) id: number,
    @Body() addEstablishmentDto: AddEstablishmentDto,
  ): Promise<{ message: string }> {
    return this.usersService.addEstablishment(
      id,
      addEstablishmentDto.establishmentId,
    );
  }

  /**
   * DELETE /users/:id/establishments/:establishmentId
   * Remover estabelecimento do usuário
   * Apenas Administrador
   */
  @Delete(':id/establishments/:establishmentId')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async removeEstablishment(
    @Param('id', ParseIntPipe) id: number,
    @Param('establishmentId', ParseIntPipe) establishmentId: number,
  ): Promise<{ message: string }> {
    return this.usersService.removeEstablishment(id, establishmentId);
  }
}
