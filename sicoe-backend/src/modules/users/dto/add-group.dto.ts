import { IsNotEmpty, IsInt } from 'class-validator';

export class AddGroupDto {
  @IsNotEmpty({ message: 'ID do grupo é obrigatório' })
  @IsInt({ message: 'ID do grupo deve ser um número inteiro' })
  groupId: number;
}
