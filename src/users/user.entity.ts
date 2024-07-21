import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Purchase } from '../purchases/purchase.entity';
import { Role } from '../auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  referralCode: string;

  @Column({ nullable: true }) // Allow referredBy to be nullable
  referredBy: string;

  @Column({ default: 0 })
  earnings: number;

  @Column({ type: 'simple-array', default: Role.User })
  roles: Role[];

  @OneToMany(() => Purchase, purchase => purchase.user)
  purchases: Purchase[];
}
