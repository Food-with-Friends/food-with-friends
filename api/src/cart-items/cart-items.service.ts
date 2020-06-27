import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemRepository } from './cart-item.repository';
import { CreateCartItemDto } from './dto/create-cart-item-dto';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemsRepository: CartItemRepository,
  ) {}

  async createCartItems(cartItems: CreateCartItemDto[]): Promise<CartItem[]> {
    return this.cartItemsRepository.createCartItems(cartItems);
  }
}
