import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Order } from '../orders/order.entity';
import { Exclude, classToPlain } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @Column({ nullable: true })
  email: string;

  @ManyToMany((type) => Order, (order) => order.payees)
  orders: Order[];

  // TODO: Implement Cart
  // @OneToMany((type) => Cart, (cart) => cart.user, { eager: true })
  // carts: Cart[];

  toJSON(): any {
    return classToPlain(this);
  }

  async validatePassword(password: string): Promise<boolean> {
    const userHash = await hash(password, this.salt);
    return userHash === this.password;
  }
}
