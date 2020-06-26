import {
  Controller,
  UseGuards,
  Logger,
  Get,
  Query,
  ValidationPipe,
  ParseIntPipe,
  Param,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Order } from './order.entity';
import { GetOrdersFilterDto } from './dto/get-orders-filter-dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  private logger = new Logger('OrdersController');

  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(
    @Query(ValidationPipe) filterDto: GetOrdersFilterDto,
    @GetUser() user: User,
  ): Promise<Order[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all orders. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );

    return this.ordersService.getOrders(filterDto, user);
  }

  @Get('/:id')
  getOrderById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.getOrderById(id, user, '');
  }

  @Post('/:id')
  getOrderByIdUsingPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('orderPassword', ValidationPipe) orderPassword: string,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.getOrderById(id, user, orderPassword);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createOrderDto,
      )}`,
    );
    return this.ordersService.createOrder(createOrderDto, user);
  }
}
