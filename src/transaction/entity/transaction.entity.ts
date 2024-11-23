import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";

import { EvaluationEntity } from "../../evaluation/entity/evaluation.entity";
import { TenantEntity } from "../../tenant/entity/tenant.entity";
import { TicketEntity } from '../../ticket/entity/ticket.entity';
import { UserEntity } from "../../user/entity/user.entity";


@Entity('transaction')
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    salesPrice: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column('varchar')
    status: string;

    @Column('int', { nullable: true })
    buyerId: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.purchases)
    buyer: UserEntity;

    @Column('int')
    ticketId: number;
    
    @OneToOne(() => TicketEntity, (ticketEntity) => ticketEntity.transaction)
    ticket: TicketEntity;

    @Column('int')
    tenantId: number;

    @ManyToOne(() => TenantEntity, (tenantEntity) => tenantEntity.sales)
    tenant: TenantEntity;

    @Column('int', { nullable: true })
    evaluationId: number;

    @OneToOne(() => EvaluationEntity, (evaluation) => evaluation.transaction)
    evaluation: EvaluationEntity;
}
