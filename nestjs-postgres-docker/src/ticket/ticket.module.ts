import { Module } from "@nestjs/common";
import { TicketEntity } from "./entity/ticket.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketRepository } from "./repository/ticket.repository";
import { EventEntity } from "src/event/entity/event.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { TransactionEntity } from "src/transaction/entity/transaction.entity";
import { TicketController } from "./controller/ticket.controller";
import { TicketService } from "./service/ticket.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
      EventEntity,
      UserEntity,
      TransactionEntity,
    ]), // Registra a entidade no módulo
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
})
export class TicketModule {}
