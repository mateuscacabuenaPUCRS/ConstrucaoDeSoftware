import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "./event/entity/event.entity";
import { EventModule } from "./event/event.module";
import { TenantEntity } from "./tenant/entity/tenant.entity";
import { TenantModule } from "./tenant/tenant.module";
import { TicketEntity } from "./ticket/entity/ticket.entity";
import { TicketModule } from "./ticket/ticket.module";
import { TransactionEntity } from "./transaction/entity/transaction.entity";
import { TransactionModule } from "./transaction/transaction.module";
import { UserEntity } from "./user/entity/user.entity";
import { UserModule } from "./user/user.module";

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
        TransactionEntity,
        TenantEntity,
      ],
      synchronize: true, // Sincroniza as entidades com o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      EventEntity,
      TicketEntity,
      TransactionEntity,
      TenantEntity,
    ]), // Importa as entidades para serem usadas nos módulos
    UserModule,
    EventModule,
    TenantModule,
    TicketModule,
    TransactionModule,
  ],
})
export class AppModule {}
