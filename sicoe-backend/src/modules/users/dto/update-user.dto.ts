import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsArray, IsInt } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  groupIds?: number[]; // IDs dos grupos a serem atribuídos

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  establishmentIds?: number[]; // IDs dos estabelecimentos a serem relacionados
}
