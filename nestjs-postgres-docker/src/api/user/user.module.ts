import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  // Importar o TypeOrmModule
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './user.entity';  // Importar a entidade UserEntity

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),  // Registrar a entidade no módulo
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
