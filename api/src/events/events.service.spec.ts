import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { OrdersService } from '../orders/orders.service';

const mockOrdersService = () => ({
  // TODO: fill out mock
});

describe('EventsService', () => {
  let eventsService: EventsService;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: OrdersService, useFactory: mockOrdersService },
      ],
    }).compile();

    eventsService = module.get<EventsService>(EventsService);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(eventsService).toBeDefined();
  });
});
