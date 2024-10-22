import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EvaluationEntity } from "./evaluation/entity/evaluation.entity";
import { EvaluationModule } from "./evaluation/evaluation.module";
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
        EvaluationEntity,
        EventEntity,
        TenantEntity,
        TicketEntity,
        TransactionEntity,
        UserEntity,
      ],
      synchronize: true, // Sincroniza as entidades com o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([
      EvaluationEntity,
      EventEntity,
      TenantEntity,
      TicketEntity,
      TransactionEntity,
      UserEntity,
    ]), // Importa as entidades para serem usadas nos módulos
    EvaluationModule,
    EventModule,
    TenantModule,
    TicketModule,
    TransactionModule,
    UserModule,
  ],
})
export class AppModule {}
