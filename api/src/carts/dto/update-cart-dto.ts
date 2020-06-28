import {
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCartItemDto } from '../../cart-items/dto/create-cart-item-dto';
import { UpdateCartItemDto } from '../../cart-items/dto/update-cart-item-dto';

export class UpdateCartDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(40)
  owner: string;

  cartItemsToDelete: number[];

  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  cartItemsToUpdate: UpdateCartItemDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  cartItemsToAdd: CreateCartItemDto[];
}
