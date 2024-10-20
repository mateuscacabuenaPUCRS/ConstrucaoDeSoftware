import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  date: string; // TODO: Date type

  @Column()
  location: string;

  @Column('float')
  price: number;

  @Column()
  description: string;
}
