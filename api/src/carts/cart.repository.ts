import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart-dto';
import { Cart } from './cart.entity';
import { CartItemsService } from '../cart-items/cart-items.service';
import { UpdateCartDto } from './dto/update-cart-dto';
import { CartItem } from 'src/cart-items/cart-item.entity';

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

  async updateCarts(
    originalCarts: Cart[],
    updateCartDtos: UpdateCartDto[],
    cartItemsService: CartItemsService,
  ): Promise<Cart[]> {
    const cartIds = updateCartDtos.filter((updateCartDto) => updateCartDto.id);
    const originalCartsById = originalCarts.reduce((obj, cart) => {
      obj[cart.id] = cart.cartItems;
      return obj;
    });
    const carts = await Promise.all(
      (await this.findByIds(cartIds)).map(async (cart, idx) => {
        const {
          title,
          owner,
          cartItemsToDelete,
          cartItemsToUpdate,
          cartItemsToAdd,
        } = updateCartDtos[idx];

        const modifiedCartItemIds = new Set([
          ...cartItemsToUpdate.map((cartItem) => cartItem.id),
          ...cartItemsToDelete,
        ]);
        const originalCartItems = originalCartsById[cart.id];
        let originalCartItemsToKeep = [];
        if (originalCartItems) {
          originalCartItemsToKeep = originalCartItems.filter(
            (cartItem: CartItem) => !modifiedCartItemIds.has(cartItem.id),
          );
        }
        const cartItems = [
          ...originalCartItemsToKeep,
          ...(await cartItemsService.createCartItems(cartItemsToAdd)),
          ...(await cartItemsService.updateCartItems(cartItemsToUpdate)),
        ];
        if (cartItemsToDelete.length > 0) {
          await cartItemsService.deleteCartItems(cartItemsToDelete);
        }

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
        `Failed to update carts "${JSON.stringify(carts)}"`,
        error.stack,
      );
    }

    return carts;
  }
}
