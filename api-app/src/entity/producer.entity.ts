// src/users/producer.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Producer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @OneToOne(() => User, (user) => user.producer)
  user: User;
}
