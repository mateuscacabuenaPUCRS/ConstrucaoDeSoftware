import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm";

import { UserEntity } from "../../user/entity/user.entity";

import { TicketEntity } from '../../ticket/entity/ticket.entity';
import { TenantEntity } from "src/tenant/entity/tenant.entity";


@Entity('transaction')
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    salesPrice: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column()
    status: string;

    @Column({ nullable: true })
    buyerId: number;

    @ManyToOne (() => UserEntity, (userEntity) => userEntity.purchases)
    buyer: UserEntity;

    @Column()
    ticketId: number;
    
    @OneToOne(() => TicketEntity, (ticketEntity) => ticketEntity.transaction)
    ticket: TicketEntity;

    @Column()
    tenantId: number;

    @ManyToOne(() => TenantEntity, (tenantEntity) => tenantEntity.sales)
    tenant: TenantEntity;
}
