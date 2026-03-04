import { IsOptional, IsString, IsInt, Min, Max, IsIn, IsArray, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterAuditDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      
      return value.replace(/[<>'"`;()]/g, '').trim().substring(0, 100);
    }
    return value;
  })
  search?: string; 

  @IsOptional()
  @IsString()
  login?: string; 

  @IsOptional()
  @IsString()
  profile?: string; 

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',').map(Number);
    return value;
  })
  profiles?: number[]; 

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  actionId?: number; 

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  actions?: string[]; 

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  objectId?: number; 

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  objects?: string[]; 

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  userId?: number; 

  @IsOptional()
  @IsDateString()
  startDate?: string; 

  @IsOptional()
  @IsDateString()
  endDate?: string; 

  
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

  
  @IsOptional()
  @IsString()
  sortBy?: string = 'id';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
