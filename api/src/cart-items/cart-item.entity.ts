import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Cart } from '../carts/cart.entity';

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne((type) => Cart, (cart) => cart.cartItems)
  cart: Cart;
}
