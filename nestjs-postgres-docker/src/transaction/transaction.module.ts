import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./controller/transaction.controller";
import { TransactionService } from "./service/transaction.service";
import { TransactionRepository } from "./repository/transaction.repository";
import { TransactionEntity } from "./entity/transaction.entity";
import { UserRepository } from "../user/repository/user.repository";
import { TicketRepository } from "../ticket/repository/ticket.repository";
import { UserEntity } from "../user/entity/user.entity";
import { TicketEntity } from "../ticket/entity/ticket.entity";
import { TenantEntity } from "../tenant/entity/tenant.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, TicketEntity, TenantEntity]),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    UserRepository,
    TicketRepository,
  ],
})
export class TransactionModule {}
