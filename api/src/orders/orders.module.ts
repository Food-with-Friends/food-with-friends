import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { AuthModule } from '../auth/auth.module';
import { FeesModule } from '../fees/fees.module';
import { CartsModule } from '../carts/carts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    AuthModule,
    FeesModule,
    CartsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
