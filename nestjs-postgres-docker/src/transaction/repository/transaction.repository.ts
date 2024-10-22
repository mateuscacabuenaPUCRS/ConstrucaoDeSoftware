import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransactionEntity } from "../entity/transaction.entity";
import { Repository } from "typeorm";
import { CreateTransactionDTO } from "../dto/create-transaction.dto";
import { TransactionDTO } from "../dto/transaction.dto";

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>
  ) {}

  private toTransactionDTO({
    id,
    salesPrice,
    createdAt,
    status,
    buyerId,
    ticketId,
    tenantId,
  }: TransactionEntity & { tenantId?: number }): TransactionDTO {
    return {
      id,
      salesPrice,
      createdAt,
      status,
      buyerId,
      ticketId,
      tenantId,
    };
  }

  async add(
    createTransactionDTO: CreateTransactionDTO
  ): Promise<TransactionDTO> {
    const transaction = this.transactionRepository.create(createTransactionDTO);
    await this.transactionRepository.save(transaction);
    return this.toTransactionDTO({
      ...transaction,
      tenantId: createTransactionDTO.tenantId,
    });
  }

  async getAll(): Promise<TransactionDTO[]> {
    const transactions = await this.transactionRepository.find();
    return transactions.map(this.toTransactionDTO);
  }

  async getById(transactionId: number): Promise<TransactionDTO> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });
    return this.toTransactionDTO(transaction);
  }

  async update(
    transactionId: number,
    updatedTransaction: Partial<TransactionDTO>
  ): Promise<TransactionDTO> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    await this.transactionRepository.merge(transaction, updatedTransaction);
    await this.transactionRepository.save(transaction);

    return this.toTransactionDTO(transaction);
  }

  async deleteAll() {
    await this.transactionRepository.delete({});
  }
}
