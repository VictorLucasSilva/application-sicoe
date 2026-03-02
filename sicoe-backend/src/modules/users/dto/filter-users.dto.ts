import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class FilterUsersDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string; // firstName ou lastName

  @IsOptional()
  @IsString({ message: 'O login deve ser uma string' })
  login?: string; // username

  @IsOptional()
  @IsString({ message: 'O perfil deve ser uma string' })
  profile?: string; // nmGroup

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ID do estabelecimento deve ser um número' })
  establishmentId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ID da região deve ser um número' })
  regionId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'O ID do estado deve ser um número' })
  stateId?: number;
}
