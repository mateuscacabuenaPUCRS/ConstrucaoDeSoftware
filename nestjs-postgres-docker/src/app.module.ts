import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/entity/user.entity";
import { UserModule } from "./user/user.module";
import { EventModule } from "./event/event.module";
import { EventEntity } from "./event/entity/event.entity";
import { TicketEntity } from "./ticket/entity/ticket.entity";
import { TransactionEntity } from "./transaction/entity/transaction.entity";
import { NotificationPreferencesEntity } from "./notificationPreferences/entity/notificationPreferences";
import { TenantEntity } from "./tenant/entity/tenant.entity";
import { NotificationPreferencesModule } from "./notificationPreferences/notification-preferences.module";
import { TenantModule } from "./tenant/tenant.module";
import { TicketModule } from "./ticket/ticket.module";
import { TransactionModule } from "./transaction/transaction.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "database",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test_db",
      entities: [
        UserEntity,
        EventEntity,
        TicketEntity,
        NotificationPreferencesEntity,
        TransactionEntity,
        TenantEntity,
      ],
      synchronize: true, // Sincroniza as entidades com o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      EventEntity,
      TicketEntity,
      NotificationPreferencesEntity,
      TransactionEntity,
      TenantEntity,
    ]), // Importa as entidades para serem usadas nos módulos
    UserModule,
    EventModule,
    NotificationPreferencesModule,
    TenantModule,
    TicketModule,
    TransactionModule,
  ],
})
export class AppModule {}
