import { IsOptional, IsString, IsInt, Min, Max, IsIn, IsArray, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      // Sanitiza removendo caracteres especiais perigosos
      return value.replace(/[<>'"`;()]/g, '').trim().substring(0, 100);
    }
    return value;
  })
  search?: string; // Busca global em múltiplas colunas

  @IsOptional()
  @IsString()
  name?: string; // Busca por firstName ou lastName

  @IsOptional()
  @IsString()
  login?: string; // Busca por username

  @IsOptional()
  @IsString()
  profile?: string; // Busca por grupo/role (single value)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',').map(Number);
    return value;
  })
  profiles?: number[]; // Filtrar por múltiplos perfis (IDs)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  statuses?: string[]; // Filtrar por status (active/inactive)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  emailStatuses?: string[]; // Filtrar por status de email (enabled/disabled)

  @IsOptional()
  @IsDateString()
  startDate?: string; // Data de entrada - início

  @IsOptional()
  @IsDateString()
  endDate?: string; // Data de entrada - fim

  @IsOptional()
  @IsDateString()
  expirationStartDate?: string; // Data de vigência - início

  @IsOptional()
  @IsDateString()
  expirationEndDate?: string; // Data de vigência - fim

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  establishmentId?: number; // Filtrar por estabelecimento

  @IsOptional()
  @IsString()
  region?: string; // Filtrar por região

  @IsOptional()
  @IsString()
  state?: string; // Filtrar por estado

  // Paginação
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 10;

  // Ordenação
  @IsOptional()
  @IsString()
  sortBy?: string = 'id';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
