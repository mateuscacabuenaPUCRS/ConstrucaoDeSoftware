import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './api/user/user.entity';  // Importa a entidade UserEntity
import { UserModule } from './api/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',  // Ou use o nome do serviço de banco de dados no Docker
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test_db',
      entities: [UserEntity],  // Suas entidades
      synchronize: true,  // Sincroniza as entidades com o banco de dados automaticamente
    }),
    TypeOrmModule.forFeature([UserEntity]),  // Disponibiliza o repositório UserEntity
    UserModule,
  ],
})
export class AppModule {}
