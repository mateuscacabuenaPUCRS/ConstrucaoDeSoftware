import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { UserEntity } from "../../user/entity/user.entity";
import { EventEntity } from "../../event/entity/event.entity";
import { TicketEntity } from "../../ticket/entity/ticket.entity";
import { TransactionEntity } from "../../transaction/entity/transaction.entity";

@Entity("tenant")
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  timezone: string;

  @Column({ type: 'varchar' })
  currency: string;

  @OneToMany(() => UserEntity, (user) => user.tenantEntity)
  users: UserEntity[];

  @OneToMany(() => EventEntity, (event) => event.tenant)
  events: EventEntity[];

  @OneToMany(() => TicketEntity, (event) => event.tenant)
  tickets: TicketEntity[];

  @OneToMany(() => TransactionEntity, (event) => event.tenant)
  sales: TransactionEntity[];
}
