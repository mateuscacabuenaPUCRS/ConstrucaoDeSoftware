import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

import { TransactionEntity } from '../../transaction/entity/transaction.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('evaluation')
export class EvaluationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column()
  transactionId: number;

  @OneToOne(() => TransactionEntity, (transaction) => transaction.evaluation)
  transaction: TransactionEntity;

  @Column()
  sellerId: number;

  @ManyToOne(() => UserEntity, (seller) => seller.evaluations)
  seller: UserEntity;
}
