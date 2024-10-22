import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { TicketDTO } from "../dto/ticket.dto";
import { TicketService } from "../service/ticket.service";
import { CreateTicketDTO } from "../dto/create-ticket.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Ticket")
@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getAllTickets(): Promise<TicketDTO[]> {
    return this.ticketService.getAllTickets();
  }

  @Get(":id")
  async getTicketById(@Param("id") id: number): Promise<TicketDTO> {
    return this.ticketService.getTicketById(id);
  }

  @Post()
  async createTicket(
    @Body() createTicketDTO: CreateTicketDTO
  ): Promise<TicketDTO> {
    return this.ticketService.createTicket(createTicketDTO);
  }

  @Put(":id")
  async updateTicket(
    @Param("id") id: number,
    @Body() createTicketDTO: CreateTicketDTO
  ): Promise<TicketDTO> {
    return this.ticketService.updateTicket(id, createTicketDTO);
  }

  @Delete(":id")
  async deleteTicket(@Param("id") id: number): Promise<TicketDTO> {
    return this.ticketService.deleteTicket(id);
  }

  @Delete()
  async deleteAllTickets() {
    try {
      await this.ticketService.deleteAllTickets();
      return "All tickets deleted successfully";
    } catch (error) {
      throw new Error("Failed to delete all tickets");
    }
  }

  @Put(":id/refund")
  async refundTicket(@Param("id") id: number): Promise<TicketDTO> {
    try {
      const ticket = await this.ticketService.getTicketById(id);

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      if (ticket.status !== "sold") {
        throw new Error("Ticket was not buyed to be refunded");
      }

      return await this.ticketService.refundTicket(id);
    } catch (error) {
      throw new Error("Failed to refund ticket");
    }
  }
}
