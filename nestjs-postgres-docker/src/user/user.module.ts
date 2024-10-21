import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TenantEntity } from "src/tenant/entity/tenant.entity";
import { TicketEntity } from "src/ticket/entity/ticket.entity";
import { TransactionEntity } from "src/transaction/entity/transaction.entity";
import { UserController } from "./controller/user.controller";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./service/user.service";

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
  providers: [UserService, UserRepository],
})
export class UserModule {}
