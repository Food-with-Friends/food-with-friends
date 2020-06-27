import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { CartItemsModule } from '../cart-items/cart-items.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartRepository]), CartItemsModule],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
