import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Order } from './order.entity';
import { GetOrdersFilterDto } from './dto/get-orders-filter-dto';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FeesService } from '../fees/fees.service';
import { CartsService } from '../carts/carts.service';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');

  async getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('order');
    query
      .leftJoinAndSelect('order.payees', 'user')
      .leftJoinAndSelect('order.fees', 'fees')
      .leftJoinAndSelect('order.carts', 'carts')
      .leftJoinAndSelect('carts.cartItems', 'cartItems');

    if (search) {
      query.where('(order.title LIKE :search)', { search: `%${search}%` });
    }

    try {
      const orders = await query.getMany();
      return orders;
    } catch (error) {
      this.logger.error(
        `Failed to get orders for user "${
          user.username
        }, Filter: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
    feesService: FeesService,
    cartsService: CartsService,
  ): Promise<Order> {
    const {
      title,
      password,
      fees: createFeeDtos,
      carts: createCartDtos,
    } = createOrderDto;

    const fees = await feesService.createFees(createFeeDtos);
    const carts = await cartsService.createCarts(createCartDtos);

    const order = new Order();
    order.title = title;
    order.salt = await genSalt();
    order.password = await this.hashPassword(password, order.salt);
    order.payees = [user];
    order.fees = fees;
    order.carts = carts;

    try {
      await order.save();
    } catch (error) {
      this.logger.error(
        `Failed to create order for user "${user.id}, order "${order.title}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return order;
  }

  async updateOrder(
    order: Order,
    updateOrderDto: UpdateOrderDto,
    user: User,
    feesService: FeesService,
    cartsService: CartsService,
  ): Promise<Order> {
    const {
      title,
      payees,
      feesToDelete,
      feesToUpdate,
      feesToAdd,
      cartsToDelete,
      cartsToUpdate,
      cartsToAdd,
    } = updateOrderDto;

    const modifiedFeeIds = new Set([
      ...feesToUpdate.map((fee) => fee.id),
      ...feesToDelete,
    ]);
    let originalFeesToKeep = [];
    if (order.fees) {
      originalFeesToKeep = order.fees?.filter(
        (fee) => !modifiedFeeIds.has(fee.id),
      );
    }
    const fees = [
      ...originalFeesToKeep,
      ...(await feesService.updateFees(feesToUpdate)),
      ...(await feesService.createFees(feesToAdd)),
    ];
    if (feesToDelete.length > 0) {
      await feesService.deleteFees(feesToDelete);
    }

    const modifiedCartIds = new Set([
      ...cartsToUpdate.map((cart) => cart.id),
      ...cartsToDelete,
    ]);
    let originalCartsToKeep = [];
    if (order.carts) {
      originalCartsToKeep = order.carts?.filter(
        (cart) => !modifiedCartIds.has(cart.id),
      );
    }
    const carts = [
      ...originalCartsToKeep,
      ...(await cartsService.updateCarts(order.carts, cartsToUpdate)),
      ...(await cartsService.createCarts(cartsToAdd)),
    ];
    if (cartsToDelete.length > 0) {
      await cartsService.deleteCarts(cartsToDelete);
    }

    order.title = title;
    order.payees = payees;
    order.fees = fees;
    order.carts = carts;

    try {
      await order.save();
    } catch (error) {
      this.logger.error(
        `Failed to update order for user "${user.id}, order "${order.title}"`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return order;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}
