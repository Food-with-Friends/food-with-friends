import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepository } from './order.repository';
import { FeesService } from '../fees/fees.service';

const mockOrderRepository = () => ({
  // TODO: fill out mock
});

const mockFeeService = () => ({
  // TODO: fill out mock
});

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let orderRepository: OrderRepository;
  let feesService: FeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: FeesService, useFactory: mockFeeService },
        { provide: OrderRepository, useFactory: mockOrderRepository },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    feesService = module.get<FeesService>(FeesService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });
});
