import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EventEntity } from '../entity/event.entity';
import { EventDTO } from '../dto/event.dto';
import { CreateEventDTO } from '../dto/create-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  private toEventDTO({ id, name, type, location, createdAt, tenantId }: EventEntity): EventDTO {
    return { id, tenantId, name, type, location, createdAt };
  }
  
  async getAll(): Promise<EventDTO[]> {
    const events = await this.eventRepository.find();
    return events.map((event) => this.toEventDTO(event));
  }

  async getById(id: number): Promise<EventDTO> {
    const event = await this.eventRepository.findOne({ where: { id } });
    return this.toEventDTO(event);
  }

  async add(createEventDTO: CreateEventDTO): Promise<EventDTO> {
    const event = this.eventRepository.create(createEventDTO);
    await this.eventRepository.save(event);
    return this.toEventDTO(event);
  }

  async update(id: number, createEventDTO: CreateEventDTO): Promise<EventDTO> {
    const event = await this.eventRepository.findOne({ where: { id } });
    event.name = createEventDTO.name;
    event.type = createEventDTO.type;
    event.location = createEventDTO.location;
    await this.eventRepository.save(event);
    return this.toEventDTO(event);
  }

  async delete(id: number): Promise<EventDTO> {
    const event = await this.eventRepository.findOne({ where: { id } });
    await this.eventRepository.remove(event);
    return this.toEventDTO(event);
  }

  async search(name: string): Promise<EventDTO[]> {
    const events = await this.eventRepository.find({ where: { name } });
    return events.map((event) => this.toEventDTO(event));
  }
}
