import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateEmailDto {
  @IsNotEmpty({ message: 'Tipo de e-mail é obrigatório' })
  @IsString()
  tpEmail: string;

  @IsOptional()
  @IsString()
  txObject?: string;

  @IsNotEmpty({ message: 'Destinatário é obrigatório' })
  @IsEmail({}, { message: 'Destinatário deve ser um e-mail válido' })
  txDestination: string;

  @IsNotEmpty({ message: 'Assunto é obrigatório' })
  @IsString()
  txSubject: string;

  @IsNotEmpty({ message: 'Corpo do e-mail é obrigatório' })
  @IsString()
  txBody: string;

  @IsOptional()
  @IsBoolean()
  flgSent?: boolean;

  @IsOptional()
  @IsString()
  txError?: string;
}
