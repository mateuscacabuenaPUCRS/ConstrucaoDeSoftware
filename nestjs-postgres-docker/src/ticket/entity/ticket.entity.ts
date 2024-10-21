import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from "typeorm";

import { EventEntity } from "src/event/entity/event.entity";

import { UserEntity } from "src/user/entity/user.entity";

import { TransactionEntity } from 'src/transaction/entity/transaction.entity';


@Entity("ticket")
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalPrice: number;

  @Column()
  verificationCode: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  eventId: number;

  @ManyToOne(() => EventEntity, (event) => event.tickets)
  event: EventEntity;
  
  @Column({ nullable: true })
  sellerId: number;

  @ManyToOne(()=> UserEntity, (userEntity) => userEntity.ticketsForSale)
  seller: UserEntity;

  @OneToOne(() => TransactionEntity, (transactionEntity) => transactionEntity.ticket)
  transaction: TransactionEntity;
}
