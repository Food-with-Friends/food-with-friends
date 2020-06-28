import {
  IsString,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateFeeDto } from '../../fees/dto/create-fee-dto';
import { Type } from 'class-transformer';
import { CreateCartDto } from '../../carts/dto/create-cart-dto';
import { User } from '../../auth/user.entity';
import { UpdateFeeDto } from '../../fees/dto/update-fee-dto';
import { UpdateCartDto } from '../../carts/dto/update-cart-dto';

export class UpdateOrderDto {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  title: string;

  // TODO: Add validation
  payees: User[];

  feesToDelete: number[];

  @ValidateNested({ each: true })
  @Type(() => CreateFeeDto)
  feesToUpdate: UpdateFeeDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateFeeDto)
  feesToAdd: CreateFeeDto[];

  cartsToDelete: number[];

  @ValidateNested({ each: true })
  @Type(() => CreateCartDto)
  cartsToUpdate: UpdateCartDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateCartDto)
  cartsToAdd: CreateCartDto[];
}
