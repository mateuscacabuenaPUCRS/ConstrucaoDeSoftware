import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { EventService } from "../service/event.service";
import { EventDTO } from "../dto/event.dto";
import { CreateEventDTO } from "../dto/create-event.dto";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAll(): Promise<EventDTO[]> {
    return this.eventService.getAll();
  }

  @Get(":id")
  async getEventById(@Param("id") id: number): Promise<EventDTO> {
    return this.eventService.getEventById(id);
  }

  @Post()
  async createEvent(@Body() createEventDTO: CreateEventDTO): Promise<EventDTO> {
    return this.eventService.createEvent(createEventDTO);
  }

  @Delete(":id")
  async deleteEvent(@Param("id") id: number): Promise<EventDTO> {
    return this.eventService.deleteEvent(id);
  }
}
