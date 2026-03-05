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


  @Get('logins')
  async getLogins(): Promise<string[]> {
    return this.usersService.getLogins();
  }


  @Get()
  async findAll(@Query() filterDto: FilterUserDto): Promise<{
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.usersService.findAll(filterDto);
  }


  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }


  @Post()
  @Roles('Administrador')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }


  @Patch(':id')
  @Roles('Administrador')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }


  @Delete(':id')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }


  @Post(':id/groups')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async addGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() addGroupDto: AddGroupDto,
  ): Promise<{ message: string }> {
    return this.usersService.addGroup(id, addGroupDto.groupId);
  }


  @Delete(':id/groups/:groupId')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async removeGroup(
    @Param('id', ParseIntPipe) id: number,
    @Param('groupId', ParseIntPipe) groupId: number,
  ): Promise<{ message: string }> {
    return this.usersService.removeGroup(id, groupId);
  }


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
