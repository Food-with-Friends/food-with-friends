import { IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
