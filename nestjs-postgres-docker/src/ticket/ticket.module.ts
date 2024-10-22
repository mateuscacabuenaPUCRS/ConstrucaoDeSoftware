import { Module } from "@nestjs/common";
import { TicketEntity } from "./entity/ticket.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketRepository } from "./repository/ticket.repository";
import { EventEntity } from "../event/entity/event.entity";
import { UserEntity } from "../user/entity/user.entity";
import { TransactionEntity } from "../transaction/entity/transaction.entity";
import { TicketController } from "./controller/ticket.controller";
import { TicketService } from "./service/ticket.service";
import { TenantEntity } from "../tenant/entity/tenant.entity";
import { TransactionRepository } from "../transaction/repository/transaction.repository";

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
