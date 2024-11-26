import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

import { EventEntity } from "../../event/entity/event.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { TransactionEntity } from "../../transaction/entity/transaction.entity";
import { TenantEntity } from "../../tenant/entity/tenant.entity";

@Entity("ticket")
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  originalPrice: number;

  @Column({ type: 'int' })
  verificationCode: number;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'int', nullable: true })
  eventId: number;

  @ManyToOne(() => EventEntity, (event) => event.tickets)
  event: EventEntity;

  @Column({ type: 'int', nullable: true })
  sellerId: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.ticketsForSale)
  seller: UserEntity;

  @OneToOne(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.ticket
  )
  transaction: TransactionEntity;

  @Column({ type: 'int', nullable: true })
  tenantId: number;

  @ManyToOne(() => TenantEntity, (tenantEntity) => tenantEntity.tickets)
  tenant: TenantEntity;
}
