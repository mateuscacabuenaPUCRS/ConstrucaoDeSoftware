import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import { TenantEntity } from "../../tenant/entity/tenant.entity";

import { TicketEntity } from "../../ticket/entity/ticket.entity";

import { TransactionEntity } from "../../transaction/entity/transaction.entity";

import { NotificationPreferencesEntity } from "../../notificationPreferences/entity/notificationPreferences";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

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

  @OneToOne(
    () => NotificationPreferencesEntity,
    (preferences) => preferences.user
  )
  notificationPreferences: NotificationPreferencesEntity;
}
