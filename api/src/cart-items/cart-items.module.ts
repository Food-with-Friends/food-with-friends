import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemRepository } from './cart-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemRepository])],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
