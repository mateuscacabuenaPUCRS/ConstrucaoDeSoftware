import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEntity } from "./entity/event.entity";
import { EventController } from "./controller/event.controller";
import { EventService } from "./service/event.service";
import { EventRepository } from "./repository/event.repository";
import { TicketRepository } from "../ticket/repository/ticket.repository";
import { TicketEntity } from "../ticket/entity/ticket.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, TicketEntity])],
  controllers: [EventController],
  providers: [EventService, EventRepository, TicketRepository],
})
export class EventModule {}
