import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { TicketEntity } from "../entity/ticket.entity";
import { TicketDTO } from "../dto/ticket.dto";
import { CreateTicketDTO } from "../dto/create-ticket.dto";

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>
  ) {}

  private toTicketDTO({
    id,
    originalPrice,
    verificationCode,
    status,
    eventId,
    sellerId,
    tenantId,
  }: TicketEntity & { tenantId?: number }): TicketDTO {
    return {
      id,
      eventId,
      tenantId,
      sellerId,
      originalPrice,
      verificationCode,
      status,
    };
  }

  async getAll(): Promise<TicketDTO[]> {
    const tickets = await this.ticketRepository.find();
    return tickets.map(this.toTicketDTO);
  }

  async getById(id: number): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    return this.toTicketDTO(ticket);
  }

  async add(createTicketDTO: CreateTicketDTO): Promise<TicketDTO> {
    const ticket = this.ticketRepository.create(createTicketDTO);
    await this.ticketRepository.save(ticket);
    return this.toTicketDTO({ ...ticket, tenantId: createTicketDTO.tenantId });
  }

  async update(
    id: number,
    createTicketDTO: CreateTicketDTO
  ): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    this.ticketRepository.merge(ticket, createTicketDTO);
    await this.ticketRepository.save(ticket);
    return this.toTicketDTO(ticket);
  }

  async delete(id: number): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    await this.ticketRepository.remove(ticket);
    return this.toTicketDTO(ticket);
  }

  async findAvailableTickets(eventId: number): Promise<TicketDTO[]> {
    const tickets = await this.ticketRepository.find({
      where: { event: { id: eventId }, status: "disponivel" },
    });
    return tickets.map(this.toTicketDTO);
  }

  // TODO: fix this
  async updateTicketAvailability(ticketIds: number[]): Promise<void> {
    await this.ticketRepository.update(ticketIds, { status: "" });
  }
}
