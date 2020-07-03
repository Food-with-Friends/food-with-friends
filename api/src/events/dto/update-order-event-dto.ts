import { Type } from 'class-transformer';
import { IsIn, ValidateIf, ValidateNested } from 'class-validator';
import { User } from '../../auth/user.entity';
import { CreateCartDto } from '../../carts/dto/create-cart-dto';
import { UpdateCartDto } from '../../carts/dto/update-cart-dto';
import { CreateFeeDto } from '../../fees/dto/create-fee-dto';
import { UpdateFeeDto } from '../../fees/dto/update-fee-dto';
import { OrderActionType } from '../order-action-type.enum';

export class UpdateOrderEventDto {
  @IsIn([
    OrderActionType.ADD_CART,
    OrderActionType.ADD_FEE,
    OrderActionType.DELETE_CART,
    OrderActionType.DELETE_FEE,
    OrderActionType.UPDATE_CART,
    OrderActionType.UPDATE_FEE,
    OrderActionType.UPDATE_PAYEES,
    OrderActionType.UPDATE_TITLE,
  ])
  type: OrderActionType;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.feeToDelete &&
        !o.feeToUpdate &&
        !o.feeToAdd &&
        !o.cartToDelete &&
        !o.cartToUpdate &&
        !o.cartToAdd) ||
      o.payees,
  )
  payees: User[];

  @ValidateIf(
    (o) =>
      (!o.payees &&
        !o.feeToDelete &&
        !o.feeToUpdate &&
        !o.feeToAdd &&
        !o.cartToDelete &&
        !o.cartToUpdate &&
        !o.cartToAdd) ||
      o.title,
  )
  title: string;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.payees &&
        !o.feeToUpdate &&
        !o.feeToAdd &&
        !o.cartToDelete &&
        !o.cartToUpdate &&
        !o.cartToAdd) ||
      o.feeToDelete,
  )
  feeToDelete: number;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.feeToDelete &&
        !o.payees &&
        !o.feeToAdd &&
        !o.cartToDelete &&
        !o.cartToUpdate &&
        !o.cartToAdd) ||
      o.feeToUpdate,
  )
  @ValidateNested({ each: true })
  @Type(() => UpdateFeeDto)
  feeToUpdate: UpdateFeeDto;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.feeToDelete &&
        !o.feeToUpdate &&
        !o.payees &&
        !o.cartToDelete &&
        !o.cartToUpdate &&
        !o.cartToAdd) ||
      o.feeToAdd,
  )
  @ValidateNested({ each: true })
  @Type(() => CreateFeeDto)
  feeToAdd: CreateFeeDto;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.feeToDelete &&
        !o.feeToUpdate &&
        !o.feeToAdd &&
        !o.payees &&
        !o.cartToUpdate &&
        !o.cartToAdd) ||
      o.cartToDelete,
  )
  cartToDelete: number;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.feeToDelete &&
        !o.feeToUpdate &&
        !o.feeToAdd &&
        !o.cartToDelete &&
        !o.payees &&
        !o.cartToAdd) ||
      o.cartToUpdate,
  )
  @ValidateNested({ each: true })
  @Type(() => UpdateCartDto)
  cartToUpdate: UpdateCartDto;

  @ValidateIf(
    (o) =>
      (!o.title &&
        !o.feeToDelete &&
        !o.feeToUpdate &&
        !o.feeToAdd &&
        !o.cartToDelete &&
        !o.cartToUpdate &&
        !o.payees) ||
      o.cartToAdd,
  )
  @ValidateNested({ each: true })
  @Type(() => CreateCartDto)
  cartToAdd: CreateCartDto;
}
