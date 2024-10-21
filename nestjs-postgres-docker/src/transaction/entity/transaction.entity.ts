import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from "typeorm";

import { UserEntity } from "src/user/entity/user.entity";

import { TicketEntity } from 'src/ticket/entity/ticket.entity';


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
}
