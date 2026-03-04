import { IsInt, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateAttachmentDto {
  @IsInt()
  documentId: number;

  @IsDateString()
  dtValidity: string;

  @IsString()
  @IsOptional()
  txComments?: string;
}
