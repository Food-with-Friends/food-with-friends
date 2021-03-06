import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';
import authConfig from './config/auth.config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { FeesModule } from './fees/fees.module';
import { EventsModule } from './events/events.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
      envFilePath: [__dirname + '/../../.env'],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    OrdersModule,
    FeesModule,
    AuthModule,
    EventsModule,
    CartsModule,
    CartItemsModule,
  ],
})
export class AppModule {}
