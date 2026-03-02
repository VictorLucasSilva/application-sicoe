import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Password é obrigatório' })
  @IsString()
  @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres' })
  password: string;
}
