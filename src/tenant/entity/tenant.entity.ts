import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { UserEntity } from "../../user/entity/user.entity";
import { EventEntity } from "../../event/entity/event.entity";
import { TicketEntity } from "../../ticket/entity/ticket.entity";
import { TransactionEntity } from "../../transaction/entity/transaction.entity";

@Entity("tenant")
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  timezone: string;

  @Column('varchar')
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
