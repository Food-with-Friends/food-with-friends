import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { User } from '../auth/user.entity';
import { Fee } from '../fees/fee.entity';
import { Cart } from '../carts/cart.entity';
import { Exclude, classToPlain } from 'class-transformer';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  salt: string;

  @ManyToMany((type) => User, (user) => user.orders, { cascade: true })
  @JoinTable()
  payees: User[];

  @OneToMany((type) => Fee, (fee) => fee.order, { eager: true, cascade: true })
  fees: Fee[];

  @OneToMany((type) => Cart, (cart) => cart.order, {
    eager: true,
    cascade: true,
  })
  carts: Cart[];

  toJSON(): any {
    return classToPlain(this);
  }

  async validatePassword(password: string): Promise<boolean> {
    const orderHash = await hash(password, this.salt);
    return orderHash === this.password;
  }
}
