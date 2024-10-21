import { Injectable } from "@nestjs/common";
import { EventRepository } from "../repository/event.repository";
import { EventDTO } from "../dto/event.dto";
import { CreateEventDTO } from "../dto/create-event.dto";
import { TicketDTO } from "../../ticket/dto/ticket.dto";
import { TicketRepository } from "../../ticket/repository/ticket.repository";

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async getAll(): Promise<EventDTO[]> {
    return this.eventRepository.getAll();
  }

  async getEventById(id: number): Promise<EventDTO> {
    return this.eventRepository.getById(id);
  }

  async createEvent(createEventDTO: CreateEventDTO): Promise<EventDTO> {
    return this.eventRepository.add(createEventDTO);
  }

  async updateEvent(
    id: number,
    createEventDTO: CreateEventDTO
  ): Promise<EventDTO> {
    return this.eventRepository.update(id, createEventDTO);
  }

  async deleteEvent(id: number): Promise<EventDTO> {
    return this.eventRepository.delete(id);
  }

  async search(name: string): Promise<EventDTO[]> {
    return this.eventRepository.search(name);
  }

  async getAvailableTickets(eventId: number): Promise<TicketDTO[]> {
    const tickets = await this.ticketRepository.findAvailableTickets(eventId);
    return tickets;
  }
}
