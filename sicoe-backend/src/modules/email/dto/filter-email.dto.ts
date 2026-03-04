import { IsOptional, IsString, IsInt, Min, Max, IsIn, IsBoolean, IsArray, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterEmailDto {
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
  type?: string; 

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  types?: string[]; 

  @IsOptional()
  @IsString()
  object?: string; 

  @IsOptional()
  @IsString()
  subject?: string; 

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  subjects?: string[]; 

  @IsOptional()
  @IsString()
  destination?: string; 

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  sent?: boolean; 

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',');
    return value;
  })
  statuses?: string[]; 

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
