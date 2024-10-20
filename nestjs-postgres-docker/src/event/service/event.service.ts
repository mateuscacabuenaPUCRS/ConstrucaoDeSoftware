import { Injectable } from "@nestjs/common";
import { EventRepository } from "../repository/event.repository";
import { EventDTO } from "../dto/event.dto";
import { CreateEventDTO } from "../dto/create-event.dto";

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getAll(): Promise<EventDTO[]> {
    return this.eventRepository.getAll();
  }

  async getEventById(id: number): Promise<EventDTO> {
    return this.eventRepository.getById(id);
  }

  async createEvent(createEventDTO: CreateEventDTO): Promise<EventDTO> {
    return this.eventRepository.add(createEventDTO);
  }

  async deleteEvent(id: number): Promise<EventDTO> {
    return this.eventRepository.delete(id);
  }
}
