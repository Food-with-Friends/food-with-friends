import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { OrdersService } from '../orders/orders.service';

const mockEventsService = () => ({
  // TODO: fill out mock
});

describe('EventsGateway', () => {
  let eventsGateway: EventsGateway;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsGateway,
        { provide: EventsService, useFactory: mockEventsService },
      ],
    }).compile();

    eventsGateway = module.get<EventsGateway>(EventsGateway);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(eventsGateway).toBeDefined();
  });
});
