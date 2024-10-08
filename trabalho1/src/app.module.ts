import { Module } from '@nestjs/common';
import { AppController } from './example/controller/app.controller';
import { AppService } from './example/service/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
