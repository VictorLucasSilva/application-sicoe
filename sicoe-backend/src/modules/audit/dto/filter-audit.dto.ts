import { IsOptional, IsString, IsInt, Min, Max, IsIn, IsArray, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterAuditDto {
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
  login?: string; // Busca por txLogin

  @IsOptional()
  @IsString()
  profile?: string; // Busca por txProfile (single)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',').map(Number);
    return value;
  })
  profiles?: number[]; // Filtrar por múltiplos perfis (IDs)

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  actionId?: number; // Filtrar por fkAction (single)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  actions?: string[]; // Filtrar por múltiplas ações

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  objectId?: number; // Filtrar por fkObject (single)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  objects?: string[]; // Filtrar por múltiplos objetos

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number; // Filtrar por fkUser

  @IsOptional()
  @IsDateString()
  startDate?: string; // Data inicial (YYYY-MM-DD)

  @IsOptional()
  @IsDateString()
  endDate?: string; // Data final (YYYY-MM-DD)

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
