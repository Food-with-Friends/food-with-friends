import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderRepository } from './order.repository';

const mockOrderRepository = () => ({
  // TODO: fill out mock
});

describe('OrdersService', () => {
  let orderService: OrdersService;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrderRepository, useFactory: mockOrderRepository },
      ],
    }).compile();

    orderService = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });
});
