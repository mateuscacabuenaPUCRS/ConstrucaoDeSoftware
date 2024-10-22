import { Module } from "@nestjs/common";
import { TicketEntity } from "./entity/ticket.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketRepository } from "./repository/ticket.repository";
import { EventEntity } from "src/event/entity/event.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { TransactionEntity } from "src/transaction/entity/transaction.entity";
import { TicketController } from "./controller/ticket.controller";
import { TicketService } from "./service/ticket.service";
import { TenantEntity } from "src/tenant/entity/tenant.entity";
import { TransactionRepository } from "src/transaction/repository/transaction.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
      EventEntity,
      UserEntity,
      TransactionEntity,
      TenantEntity,
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository, TransactionRepository],
})
export class TicketModule {}
