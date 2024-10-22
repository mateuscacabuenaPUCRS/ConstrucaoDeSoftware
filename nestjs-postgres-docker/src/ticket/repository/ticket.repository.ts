import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTicketDTO } from "../dto/create-ticket.dto";
import { TicketDTO } from "../dto/ticket.dto";
import { TicketEntity } from "../entity/ticket.entity";

@Injectable()
export class TicketRepository {
  updateTicketAvailability(ticketIds: number[]) {
    throw new Error("Method not implemented.");
  }
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
  }: TicketEntity): TicketDTO {
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
      where: { event: { id: eventId }, status: "available" },
    });
    return tickets.map(this.toTicketDTO);
  }

  async updateStatus(id: number, status: string): Promise<TicketDTO> {
    let ticket = await this.ticketRepository.findOne({ where: { id } });
    ticket.status = status;

    await this.ticketRepository.save(ticket);
    return this.toTicketDTO(ticket);
  }

  async deleteAll() {
    await this.ticketRepository.delete({});
  }

  async getUserTickets(userId: number): Promise<TicketDTO[]> {
    const tickets = await this.ticketRepository.find({
      where: { tenantId: userId },
    });

    return tickets.map(this.toTicketDTO);
  }
}
