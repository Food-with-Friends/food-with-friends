import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { AuthModule } from '../auth/auth.module';
import { FeesModule } from 'src/fees/fees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    AuthModule,
    FeesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
