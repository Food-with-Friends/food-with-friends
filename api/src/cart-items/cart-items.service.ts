import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItemRepository } from './cart-item.repository';
import { CreateCartItemDto } from './dto/create-cart-item-dto';
import { CartItem } from './cart-item.entity';
import { UpdateCartItemDto } from './dto/update-cart-item-dto';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemsRepository: CartItemRepository,
  ) {}

  async createCartItems(cartItems: CreateCartItemDto[]): Promise<CartItem[]> {
    return this.cartItemsRepository.createCartItems(cartItems);
  }

  async deleteCartItems(ids: number[]): Promise<void> {
    const result = await this.cartItemsRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Tried to delete non-existent ID for cart items in "${ids}"`,
      );
    }
  }

  async updateCartItems(cartItems: UpdateCartItemDto[]): Promise<CartItem[]> {
    return this.cartItemsRepository.updateCartItems(cartItems);
  }
}
