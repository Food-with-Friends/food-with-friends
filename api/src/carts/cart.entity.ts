import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { CartItem } from '../cart-items/cart-item.entity';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  owner: string;

  @OneToMany((type) => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true,
  })
  cartItems: CartItem[];

  @ManyToOne((type) => Order, (order) => order.fees)
  order: Order;
}
