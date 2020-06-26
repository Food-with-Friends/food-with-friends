import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsBoolean,
  IsDecimal,
} from 'class-validator';

export class CreateFeeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  isPercent: boolean;
}
