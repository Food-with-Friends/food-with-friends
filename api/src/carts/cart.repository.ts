import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart-dto';
import { Cart } from './cart.entity';
import { CartItemsService } from '../cart-items/cart-items.service';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  private logger = new Logger('CartRepository');

  async createCarts(
    createCartDtos: CreateCartDto[],
    cartItemsService: CartItemsService,
  ): Promise<Cart[]> {
    const carts = await Promise.all(
      createCartDtos.map(async (createCartDto) => {
        const { title, owner, cartItems: cartItemDtos } = createCartDto;

        const cartItems = await cartItemsService.createCartItems(cartItemDtos);

        const cart = new Cart();
        cart.title = title;
        cart.owner = owner;
        cart.cartItems = cartItems;
        return cart;
      }),
    );

    try {
      await this.save(carts);
    } catch (error) {
      this.logger.error(
        `Failed to create carts "${JSON.stringify(carts)}"`,
        error.stack,
      );
    }

    return carts;
  }
}
