import { Injectable } from "@nestjs/common";
import { TenantDTO } from "../dto/tenant.dto";
import { TenantRepository } from "../repository/tenant.repository";
import { CreateTenantDTO } from "../dto/create-tenant.dto";

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

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
}
