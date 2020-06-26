import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Fee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('float')
  amount: number;

  @Column()
  isPercent: boolean;

  @ManyToOne((type) => Order, (order) => order.fees)
  order: Order;
}
