import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart-dto';
import { Cart } from './cart.entity';
import { CartItemsService } from '../cart-items/cart-items.service';

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
}
