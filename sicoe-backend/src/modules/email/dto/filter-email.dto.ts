import { IsOptional, IsString, IsInt, Min, Max, IsIn, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterEmailDto {
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
  type?: string; // Busca por tpEmail (single)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  types?: string[]; // Filtrar por múltiplos tipos

  @IsOptional()
  @IsString()
  object?: string; // Busca por txObject

  @IsOptional()
  @IsString()
  subject?: string; // Busca por txSubject (single)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  subjects?: string[]; // Filtrar por múltiplos assuntos

  @IsOptional()
  @IsString()
  destination?: string; // Busca por txDestination

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  sent?: boolean; // Filtrar por flgSent (single)

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  statuses?: string[]; // Filtrar por múltiplos status (sent/pending/failed)

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
