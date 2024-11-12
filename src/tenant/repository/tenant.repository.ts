import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { TenantEntity } from "../entity/tenant.entity";
import { TenantDTO } from "../dto/tenant.dto";
import { CreateTenantDTO } from "../dto/create-tenant.dto";

@Injectable()
export class TenantRepository {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>
  ) {}

  private toTenantDTO({ id, name, email, phone, timezone, currency }: TenantEntity): TenantDTO {
    return {
      id,
      name,
      contactInformations: { email, phone },
      settings: { timezone, currency },
    };
  }

  private toTenantEntity({ name, contactInformations, settings }: TenantDTO | CreateTenantDTO): DeepPartial<TenantEntity> {
    const { email, phone } = contactInformations;
    const { timezone, currency } = settings;
    return {
      name,
      email,
      phone,
      timezone,
      currency,
    };
  }

  async getAll(): Promise<TenantDTO[]> {
    const tenants = await this.tenantRepository.find();
    return tenants.map(this.toTenantDTO);
  }

  async getById(id: number): Promise<TenantDTO> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    return this.toTenantDTO(tenant);
  }

  async add(createTenantDTO: CreateTenantDTO): Promise<TenantDTO> {
    const tenant = this.tenantRepository.create(
      this.toTenantEntity(createTenantDTO)
    );
    await this.tenantRepository.save(tenant);
    return this.toTenantDTO(tenant);
  }

  async update(
    id: number,
    createTenantDTO: CreateTenantDTO
  ): Promise<TenantDTO> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    this.tenantRepository.merge(tenant, createTenantDTO);
    await this.tenantRepository.save(tenant);
    return this.toTenantDTO(tenant);
  }

  async delete(id: number): Promise<TenantDTO> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    await this.tenantRepository.remove(tenant);
    return this.toTenantDTO(tenant);
  }
}
