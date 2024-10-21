import { Injectable } from "@nestjs/common";
import { TransactionDTO } from "../dto/transaction.dto";
import { TransactionRepository } from "../repository/transaction.repository";
import { UserRepository } from "src/user/repository/user.repository";
import { TicketRepository } from "src/ticket/repository/ticket.repository";

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async createTransaction(
    buyerId: number,
    ticketId: number
  ): Promise<TransactionDTO> {
    const ticket = await this.ticketRepository.getById(ticketId);

    return this.transactionRepository.add({
      tenantId: ticket.tenantId,
      buyerId,
      ticketId,
      salesPrice: ticket.originalPrice,
      status: "pending",
    });
  }

  async getTransactions(): Promise<TransactionDTO[]> {
    return this.transactionRepository.getAll();
  }

  async getTransaction(transactionId: number): Promise<TransactionDTO> {
    return this.transactionRepository.getById(transactionId);
  }

  async updateTransaction(transactionId: number, updatedTransaction: Partial<TransactionDTO>): Promise<TransactionDTO> {
    return this.transactionRepository.update(transactionId, updatedTransaction);
  }
}
