import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { TenantEntity } from "src/tenant/entity/tenant.entity";

import { TicketEntity } from "src/ticket/entity/ticket.entity";

import { TransactionEntity } from "src/transaction/entity/transaction.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({default: false})
  receiveNotifications: boolean;

  @Column({ nullable: true })
  tenantId: number;

  @ManyToOne(() => TenantEntity, (tenantEntity) => tenantEntity.users)
  tenantEntity: TenantEntity;

  @OneToMany(() => TicketEntity, (ticketEntity) => ticketEntity.seller)
  ticketsForSale: TicketEntity[];

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.buyer
  )
  purchases: TransactionEntity[];
}
