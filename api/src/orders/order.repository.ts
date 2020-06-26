import { EntityRepository, Repository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Order } from './order.entity';
import { GetOrdersFilterDto } from './dto/get-orders-filter-dto';
import { User } from '../auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { FeesService } from 'src/fees/fees.service';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');

  async getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('order');
    query
      .leftJoinAndSelect('order.payees', 'user')
      .leftJoinAndSelect('order.fees', 'fees');

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
  ): Promise<Order> {
    const { title, password, fees: createFeeDtos } = createOrderDto;

    const fees = await feesService.createFees(createFeeDtos);

    const order = new Order();
    order.title = title;
    order.salt = await genSalt();
    order.password = await this.hashPassword(password, order.salt);
    order.payees = [user];
    order.fees = fees;

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
