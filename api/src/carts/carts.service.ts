import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart-dto';
import { Cart } from './cart.entity';
import { CartItemsService } from '../cart-items/cart-items.service';
import { UpdateCartDto } from './dto/update-cart-dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartRepository)
    private cartRepository: CartRepository,
    private cartItemsService: CartItemsService,
  ) {}

  async createCarts(carts: CreateCartDto[]): Promise<Cart[]> {
    return this.cartRepository.createCarts(carts, this.cartItemsService);
  }

  async deleteCarts(ids: number[]): Promise<void> {
    const result = await this.cartRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Tried to delete non-existent ID for carts in "${ids}"`,
      );
    }
  }

  async updateCarts(
    originalCarts: Cart[],
    carts: UpdateCartDto[],
  ): Promise<Cart[]> {
    return this.cartRepository.updateCarts(
      originalCarts,
      carts,
      this.cartItemsService,
    );
  }
}
