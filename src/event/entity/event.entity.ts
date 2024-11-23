import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { TicketEntity } from '../../ticket/entity/ticket.entity';
import { TenantEntity } from '../../tenant/entity/tenant.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  location: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @OneToMany(() => TicketEntity, (ticketEntity) => ticketEntity.event)
  tickets: TicketEntity[];

  @Column('int', { nullable: true })
  tenantId: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.events)
  tenant: TenantEntity;
}
