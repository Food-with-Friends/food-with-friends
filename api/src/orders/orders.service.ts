import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { GetOrdersFilterDto } from './dto/get-orders-filter-dto';
import { User } from '../auth/user.entity';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { FeesService } from '../fees/fees.service';
import { CartsService } from '../carts/carts.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private feesService: FeesService,
    private cartsService: CartsService,
  ) {}

  getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
    return this.orderRepository.getOrders(filterDto, user);
  }

  async getOrderById(
    id: number,
    user: User,
    orderPassword: string,
  ): Promise<Order> {
    const order = await this.orderRepository.findOne({
      relations: ['payees'],
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found!`);
    }

    if (
      !order.payees.some((payee) => payee.id === payee.id) &&
      (orderPassword.length == 0 ||
        !(await order.validatePassword(orderPassword)))
    ) {
      throw new UnauthorizedException(
        `User with id ${user.id} not in payees and order password is incorrect!`,
      );
    }

    return order;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    return this.orderRepository.createOrder(
      createOrderDto,
      user,
      this.feesService,
      this.cartsService,
    );
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
    user: User,
  ): Promise<Order> {
    const order = await this.getOrderById(id, user, '');
    return this.orderRepository.updateOrder(
      order,
      updateOrderDto,
      user,
      this.feesService,
      this.cartsService,
    );
  }
}
