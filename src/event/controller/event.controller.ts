import { Controller, Get, Post, Body, Delete, Param, Put, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { EventService } from "../service/event.service";
import { EventDTO } from "../dto/event.dto";
import { CreateEventDTO } from "../dto/create-event.dto";

@ApiTags("Event")
@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAll(): Promise<EventDTO[]> {
    try {
      return await this.eventService.getAll();
    } catch (error) {
      throw new HttpException('Failed to get events', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  async getEventById(@Param("id") id: number): Promise<EventDTO> {
    try {
      const event = await this.eventService.getEventById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return event;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException('Failed to get event', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createEvent(@Body() createEventDTO: CreateEventDTO): Promise<EventDTO> {
    try {
      if (!createEventDTO.name) {
        throw new HttpException('Event name is required', HttpStatus.BAD_REQUEST);
      }
      return await this.eventService.createEvent(createEventDTO);
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException('Failed to create event', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(":id")
  async updateEvent(
    @Param("id") id: number,
    @Body() createEventDTO: CreateEventDTO
  ): Promise<EventDTO> {
    try {
      const event = await this.eventService.getEventById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return await this.eventService.updateEvent(id, createEventDTO);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND || error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException('Failed to update event', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async deleteEvent(@Param("id") id: number): Promise<EventDTO> {
    try {
      const event = await this.eventService.getEventById(id);
      if (!event) {
        throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
      }
      return await this.eventService.deleteEvent(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException('Failed to delete event', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}