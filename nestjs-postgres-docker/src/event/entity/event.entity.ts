import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { TicketEntity } from '../../ticket/entity/ticket.entity';
import { TenantEntity } from '../../tenant/entity/tenant.entity';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  location: string;

  //TODO: Definir uma coluna que atualiza automaticamente a data e hora em cada modificação.

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @OneToMany(() => TicketEntity, (ticketEntity) => ticketEntity.event)
  tickets: TicketEntity[];

  @Column({ nullable: true })
  tenantId: number;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.events)
  tenant: TenantEntity;
}
