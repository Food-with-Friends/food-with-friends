import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from '../carts/carts.service';
import { FeesService } from '../fees/fees.service';
import { OrderRepository } from './order.repository';
import { OrdersService } from './orders.service';

const mockOrderRepository = () => ({
  // TODO: fill out mock
});

const mockFeeService = () => ({
  // TODO: fill out mock
});

const mockCartService = () => ({
  // TODO: fill out mock
});

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let orderRepository: OrderRepository;
  let feesService: FeesService;
  let cartService: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: FeesService, useFactory: mockFeeService },
        { provide: OrderRepository, useFactory: mockOrderRepository },
        { provide: CartsService, useFactory: mockCartService },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    feesService = module.get<FeesService>(FeesService);
    cartService = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });
});
