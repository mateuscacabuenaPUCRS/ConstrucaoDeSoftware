import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TenantService } from "../service/tenant.service";
import { TenantDTO } from "../dto/tenant.dto";
import { CreateTenantDTO } from "../dto/create-tenant.dto";
import { TicketDTO } from "../../ticket/dto/ticket.dto";

@ApiTags("Tenant")
@Controller("tenant")
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  async getAllTenants(): Promise<TenantDTO[]> {
    try {
      return await this.tenantService.getAllTenants();
    } catch (error) {
      throw new HttpException(
        "Failed to get tenants",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getTenantById(@Param("id") id: number): Promise<TenantDTO> {
    try {
      const tenant = await this.tenantService.getTenantById(id);
      if (!tenant) {
        throw new HttpException("Tenant not found", HttpStatus.NOT_FOUND);
      }
      return tenant;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        "Failed to get tenant",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  async createTenant(
    @Body() createTenantDTO: CreateTenantDTO
  ): Promise<TenantDTO> {
    try {
      if (!createTenantDTO.name) {
        throw new HttpException(
          "Tenant name is required",
          HttpStatus.BAD_REQUEST
        );
      }
      return await this.tenantService.createTenant(createTenantDTO);
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException(
        "Failed to create tenant",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(":id")
  async updateTenant(
    @Param("id") id: number,
    @Body() createTenantDTO: CreateTenantDTO
  ): Promise<TenantDTO> {
    try {
      const tenant = await this.tenantService.getTenantById(id);
      if (!tenant) {
        throw new HttpException("Tenant not found", HttpStatus.NOT_FOUND);
      }
      return await this.tenantService.updateTenant(id, createTenantDTO);
    } catch (error) {
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.BAD_REQUEST
      ) {
        throw error;
      }
      throw new HttpException(
        "Failed to update tenant",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async deleteTenant(@Param("id") id: number): Promise<TenantDTO> {
    try {
      const tenant = await this.tenantService.getTenantById(id);
      if (!tenant) {
        throw new HttpException("Tenant not found", HttpStatus.NOT_FOUND);
      }
      return await this.tenantService.deleteTenant(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        "Failed to delete tenant",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("/validateTicket")
  async validateTicket(
    @Query("ticketId") ticketId: number,
    @Query("verificationCode") verificationCode: number
  ): Promise<TicketDTO> {
    try {
      if (!ticketId) {
        throw new HttpException(
          "Ticket ID are required",
          HttpStatus.BAD_REQUEST
        );
      }

      return await this.tenantService.validateTicket(
        ticketId,
        verificationCode
      );
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }

      throw new HttpException(
        "Failed to validate ticket",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
