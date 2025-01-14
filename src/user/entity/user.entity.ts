import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { EvaluationEntity } from "../../evaluation/entity/evaluation.entity";
import { TenantEntity } from "../../tenant/entity/tenant.entity";
import { TicketEntity } from "../../ticket/entity/ticket.entity";
import { TransactionEntity } from "../../transaction/entity/transaction.entity";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  receiveNotifications: boolean;

  @Column({ type: 'int', nullable: true })
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

  @OneToMany(() => EvaluationEntity, (evaluationEntity) => evaluationEntity.seller)
  evaluations: EvaluationEntity[];
}
