import { Injectable } from "@nestjs/common";
import { CreateTicketDTO } from "../dto/create-ticket.dto";
import { TicketRepository } from "../repository/ticket.repository";
import { TransactionRepository } from "../../transaction/repository/transaction.repository";

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getAllTickets() {
    return this.ticketRepository.getAll();
  }

  async getTicketById(id: number) {
    return this.ticketRepository.getById(id);
  }

  async createTicket(createTicketDTO: CreateTicketDTO) {
    return this.ticketRepository.add(createTicketDTO);
  }

  async updateTicket(id: number, createTicketDTO: CreateTicketDTO) {
    return this.ticketRepository.update(id, createTicketDTO);
  }

  async deleteTicket(id: number) {
    return this.ticketRepository.delete(id);
  }

  async deleteAllTickets() {
    return this.ticketRepository.deleteAll();
  }

  async refundTicket(id: number) {
    const transaction = await this.transactionRepository.getByTicketId(id);
    await this.transactionRepository.delete(transaction.id);
    return this.ticketRepository.updateStatus(id, 'available');
  }
}
