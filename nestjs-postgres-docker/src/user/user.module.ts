import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserEntity } from "./entity/user.entity";
import { TenantEntity } from "src/tenant/entity/tenant.entity";
import { TicketEntity } from "src/ticket/entity/ticket.entity";
import { TransactionEntity } from "src/transaction/entity/transaction.entity";
import { NotificationPreferencesEntity } from "src/notificationPreferences/entity/notificationPreferences";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      TenantEntity,
      TicketEntity,
      TransactionEntity,
      NotificationPreferencesEntity,
    ]), // Registra a entidade no módulo
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
