import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './api/api.module';
import configuration from 'config/configuration';
import { AppController } from './example/controller/app.controller';
import { AppService } from './example/service/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
