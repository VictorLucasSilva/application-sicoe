import { IsNotEmpty, IsString, IsInt, IsOptional, MaxLength } from 'class-validator';

export class CreateEstablishmentDto {
  @IsNotEmpty({ message: 'Código do estabelecimento é obrigatório' })
  @IsString()
  @MaxLength(20)
  sqEstablishment: string;

  @IsNotEmpty({ message: 'Nome do estabelecimento é obrigatório' })
  @IsString()
  @MaxLength(50)
  nmEstablishment: string;

  @IsOptional()
  @IsInt()
  fkRegion?: number;

  @IsOptional()
  @IsInt()
  fkState?: number;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  txAttachedBy?: string;

  @IsOptional()
  @IsString()
  @MaxLength(128)
  txCheckedBy?: string;
}
