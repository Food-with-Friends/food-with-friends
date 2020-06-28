import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateFeeDto {
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
