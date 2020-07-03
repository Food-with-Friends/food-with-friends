import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateFeeDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  isPercent: boolean;
}
