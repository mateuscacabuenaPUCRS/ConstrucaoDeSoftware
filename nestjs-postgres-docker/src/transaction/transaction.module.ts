import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./controller/transaction.controller";
import { TransactionService } from "./service/transaction.service";
import { TransactionRepository } from "./repository/transaction.repository";
import { TransactionEntity } from "./entity/transaction.entity";
import { UserRepository } from "src/user/repository/user.repository";
import { TicketRepository } from "src/ticket/repository/ticket.repository";
import { UserEntity } from "src/user/entity/user.entity";
import { TicketEntity } from "src/ticket/entity/ticket.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, TicketEntity]),
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
