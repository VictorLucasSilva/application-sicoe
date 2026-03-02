import { IsNotEmpty, IsInt } from 'class-validator';

export class AddEstablishmentDto {
  @IsNotEmpty({ message: 'ID do estabelecimento é obrigatório' })
  @IsInt({ message: 'ID do estabelecimento deve ser um número inteiro' })
  establishmentId: number;
}
