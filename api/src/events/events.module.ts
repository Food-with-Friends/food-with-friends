import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { AuthModule } from '../auth/auth.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [AuthModule, OrdersModule],
  providers: [EventsGateway, EventsService],
})
export class EventsModule {}
