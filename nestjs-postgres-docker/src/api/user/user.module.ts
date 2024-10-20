import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { UserRepository } from "./repository/user.repository";
import { UserEntity } from "./entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // Registra a entidade no módulo
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
