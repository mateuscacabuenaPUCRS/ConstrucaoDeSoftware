import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./api/user/entity/user.entity";
import { UserModule } from "./api/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "database",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test_db",
      entities: [UserEntity],
      synchronize: true, // Sincroniza as entidades com o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
})
export class AppModule {}
