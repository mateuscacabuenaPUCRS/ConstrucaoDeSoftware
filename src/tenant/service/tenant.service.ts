import { Injectable } from "@nestjs/common";
import { TenantDTO } from "../dto/tenant.dto";
import { TenantRepository } from "../repository/tenant.repository";
import { CreateTenantDTO } from "../dto/create-tenant.dto";
import { TicketDTO } from "../../ticket/dto/ticket.dto";
import { TicketRepository } from "../../ticket/repository/ticket.repository";

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantRepository: TenantRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async getAllTenants(): Promise<TenantDTO[]> {
    return this.tenantRepository.getAll();
  }

  async getTenantById(id: number): Promise<TenantDTO> {
    return this.tenantRepository.getById(id);
  }

  async createTenant(createTenantDTO: CreateTenantDTO): Promise<TenantDTO> {
    return this.tenantRepository.add(createTenantDTO);
  }

  async updateTenant(
    id: number,
    createTenantDTO: CreateTenantDTO
  ): Promise<TenantDTO> {
    return this.tenantRepository.update(id, createTenantDTO);
  }

  async deleteTenant(id: number): Promise<TenantDTO> {
    return this.tenantRepository.delete(id);
  }

  async validateTicket(
    ticketId: number,
    verificationCode: number
  ): Promise<TicketDTO> {
    const ticket = await this.ticketRepository.getById(ticketId);

    if (ticket.verificationCode != verificationCode) {
      throw new Error("Invalid verification code");
    }

    if (ticket.status !== "sold") {
      throw new Error("Ticket is not sold to be used");
    }

    const updatedTicket = await this.ticketRepository.updateStatus(
      ticket.id,
      "used"
    );

    return updatedTicket;
  }
}
