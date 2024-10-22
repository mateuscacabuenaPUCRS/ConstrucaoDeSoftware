import {
  Controller,
  Query,
  Post,
  HttpException,
  HttpStatus,
  Param,
  Get,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TransactionDTO } from "../dto/transaction.dto";
import { TransactionService } from "../service/transaction.service";

@ApiTags("Transaction")
@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Query("buyerId") buyerId: number,
    @Query("ticketId") ticketId: number
  ): Promise<TransactionDTO> {
    try {
      if (!buyerId || !ticketId) {
        throw new HttpException(
          "Buyer ID and Ticket ID are required",
          HttpStatus.BAD_REQUEST
        );
      }
      return await this.transactionService.createTransaction(buyerId, ticketId);
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException(
        "Failed to create transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getTransactions(): Promise<TransactionDTO[]> {
    try {
      return await this.transactionService.getTransactions();
    } catch (error) {
      throw new HttpException(
        "Failed to get transactions",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":transactionId")
  async getTransaction(
    @Param("transactionId") transactionId: number
  ): Promise<TransactionDTO> {
    try {
      const transaction = await this.transactionService.getTransaction(
        transactionId
      );
      if (!transaction) {
        throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        "Failed to get transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(":transactionId/validate")
  async validateTransaction(
    @Param("transactionId") transactionId: number
  ): Promise<TransactionDTO> {
    try {
      const transaction = await this.transactionService.getTransaction(
        transactionId
      );
      if (!transaction) {
        throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
      }
      return await this.transactionService.updateTransaction(transactionId, {
        status: "approved",
      });
    } catch (error) {
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.BAD_REQUEST
      ) {
        throw error;
      }
      throw new HttpException(
        "Failed to update transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(":transactionId/cancel")
  async cancelTransaction(
    @Param("transactionId") transactionId: number
  ): Promise<TransactionDTO> {
    try {
      const transaction = await this.transactionService.getTransaction(
        transactionId
      );
      if (!transaction) {
        throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
      }
      return await this.transactionService.updateTransaction(transactionId, {
        status: "canceled",
      });
    } catch (error) {
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.BAD_REQUEST
      ) {
        throw error;
      }
      throw new HttpException(
        "Failed to update transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete()
  async deleteAllTransactions() {
    try {
      await this.transactionService.deleteAllTransactions();

      return "All transactions deleted";
    } catch (error) {
      throw new HttpException(
        "Failed to delete transactions",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":transactionId")
  async deleteTransaction(
    @Param("transactionId") transactionId: number
  ): Promise<TransactionDTO> {
    try {
      const transaction = await this.transactionService.getTransaction(
        transactionId
      );
      if (!transaction) {
        throw new HttpException("Transaction not found", HttpStatus.NOT_FOUND);
      }
      return await this.transactionService.deleteTransaction(transactionId);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        "Failed to delete transaction",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
