import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user/entity/user.entity";
import { UserModule } from "./user/user.module";
import { EventModule } from "./event/event.module";
import { EventEntity } from "./event/entity/event.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "database",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test_db",
      entities: [UserEntity, EventEntity],
      synchronize: true, // Sincroniza as entidades com o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([UserEntity, EventEntity]), // Importa as entidades para serem usadas nos módulos
    UserModule,
    EventModule,
  ],
})
export class AppModule {}
