import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantEntity } from "../tenant/entity/tenant.entity";
import { TicketEntity } from "../ticket/entity/ticket.entity";
import { TransactionEntity } from "../transaction/entity/transaction.entity";
import { UserController } from "./controller/user.controller";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";
import { TicketRepository } from "../ticket/repository/ticket.repository";
import { TransactionRepository } from "../transaction/repository/transaction.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TenantEntity,
      TicketEntity,
      TransactionEntity,
    ]), // Registra a entidade no módulo
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    TicketRepository,
    TransactionRepository,
  ],
})
export class UserModule {}
