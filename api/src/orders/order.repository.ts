import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Order } from './order.entity';
import { GetOrdersFilterDto } from './dto/get-orders-filter-dto';
import { User } from 'src/auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');

  async getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('order');
    query.leftJoin('order.payees', 'user');

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
  ): Promise<Order> {
    const { title, password } = createOrderDto;

    const order = new Order();
    order.title = title;
    order.salt = await genSalt();
    order.password = await this.hashPassword(password, order.salt);
    order.payees = [user];
    try {
      await order.save();
    } catch (error) {
      this.logger.error(
        `Failed to create task for user "${user.id}, order "${order.title}"`,
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
