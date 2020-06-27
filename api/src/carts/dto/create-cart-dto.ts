import {
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from '../../cart-items/dto/create-cart-item-dto';

export class CreateCartDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  owner: string;

  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  cartItems: CreateCartItemDto[];
}
