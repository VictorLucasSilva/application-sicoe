import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  @IsString()
  @MinLength(3, { message: 'Username deve ter no mínimo 3 caracteres' })
  @MaxLength(256, { message: 'Username deve ter no máximo 256 caracteres' })
  username: string;

  @IsNotEmpty({ message: 'Password é obrigatório' })
  @IsString()
  @MinLength(8, { message: 'Password deve ter no mínimo 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/, {
    message:
      'Password deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
  })
  password: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(256, { message: 'Email deve ter no máximo 256 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'Primeiro nome é obrigatório' })
  @IsString()
  @MaxLength(256, { message: 'Primeiro nome deve ter no máximo 256 caracteres' })
  firstName: string;

  @IsNotEmpty({ message: 'Último nome é obrigatório' })
  @IsString()
  @MaxLength(256, { message: 'Último nome deve ter no máximo 256 caracteres' })
  lastName: string;
}
