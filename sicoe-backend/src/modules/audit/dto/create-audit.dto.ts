import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateAuditDto {
  @IsNotEmpty({ message: 'ID da ação é obrigatório' })
  @IsInt()
  fkAction: number;

  @IsNotEmpty({ message: 'ID do objeto é obrigatório' })
  @IsInt()
  fkObject: number;

  @IsOptional()
  @IsInt()
  fkUser?: number;

  @IsOptional()
  @IsString()
  txLogin?: string;

  @IsOptional()
  @IsString()
  txProfile?: string;

  @IsOptional()
  @IsString()
  txDescription?: string;

  @IsOptional()
  @IsString()
  txIpAddress?: string;

  @IsOptional()
  @IsString()
  txUserAgent?: string;
}
