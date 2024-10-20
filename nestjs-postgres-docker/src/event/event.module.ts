import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "./entity/event.entity";
import { EventController } from "./controller/event.controller";
import { EventService } from "./service/event.service";
import { EventRepository } from "./repository/event.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
