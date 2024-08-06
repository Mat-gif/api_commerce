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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty()
  @OneToOne(() => Client, (client) => client.user)
  @JoinColumn()
  client?: Client;

  @ApiProperty()
  @OneToOne(() => Producer, (producer) => producer.user)
  @JoinColumn()
  producer?: Producer;
}
