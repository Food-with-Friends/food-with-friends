import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateFeeDto } from '../../fees/dto/create-fee-dto';
import { Type } from 'class-transformer';
import { CreateCartDto } from '../../carts/dto/create-cart-dto';

export class CreateOrderDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  title: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ValidateNested({ each: true })
  @Type(() => CreateFeeDto)
  fees: CreateFeeDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateCartDto)
  carts: CreateCartDto[];
}
