// src/users/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Producer } from './producer.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'client' })
  role: 'client' | 'producer';

  @OneToOne(() => Client, (client) => client.user)
  @JoinColumn()
  client?: Client;

  @OneToOne(() => Producer, (producer) => producer.user)
  @JoinColumn()
  producer?: Producer;
}
