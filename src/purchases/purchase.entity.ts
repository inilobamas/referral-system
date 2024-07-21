import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, user => user.purchases, { onDelete: 'CASCADE' })
  user: User;
}