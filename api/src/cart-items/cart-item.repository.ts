import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Logger } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item-dto';
import { UpdateCartItemDto } from './dto/update-cart-item-dto';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  private logger = new Logger('CartItemRepository');

  async createCartItems(
    createCartItemDtos: CreateCartItemDto[],
  ): Promise<CartItem[]> {
    const cartItems = createCartItemDtos.map((createCartItemDto) => {
      const { title, quantity, price } = createCartItemDto;
      const cartItem = new CartItem();
      cartItem.title = title;
      cartItem.quantity = quantity;
      cartItem.price = price;
      return cartItem;
    });

    try {
      await this.save(cartItems);
    } catch (error) {
      this.logger.error(
        `Failed to create cart item "${JSON.stringify(cartItems)}"`,
        error.stack,
      );
    }

    return cartItems;
  }

  async updateCartItems(
    updateCartItemDtos: UpdateCartItemDto[],
  ): Promise<CartItem[]> {
    const cartItemIds = updateCartItemDtos.filter(
      (updateCartItemDto) => updateCartItemDto.id,
    );
    const cartItems = (await this.findByIds(cartItemIds)).map(
      (cartItem, idx) => {
        const { title, quantity, price } = updateCartItemDtos[idx];
        cartItem.title = title;
        cartItem.quantity = quantity;
        cartItem.price = price;
        return cartItem;
      },
    );

    try {
      await this.save(cartItems);
    } catch (error) {
      this.logger.error(
        `Failed to update cart items "${JSON.stringify(cartItems)}"`,
        error.stack,
      );
    }

    return cartItems;
  }
}
