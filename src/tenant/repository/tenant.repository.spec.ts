import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDTO } from '../dto/create-tenant.dto';
import { TenantDTO } from '../dto/tenant.dto';
import { TenantEntity } from '../entity/tenant.entity';
import { TenantRepository } from './tenant.repository';

const tenantEntity = {
    id: 1,
    name: 'Test Tenant',
    email: 'test@example.com',
    phone: '123456789',
    timezone: 'UTC',
    currency: 'USD',
    users: [],
    events: [],
    tickets: [],
    sales: [],
};

const createTenantDTO: CreateTenantDTO = {
    name: 'Test Tenant',
    contactInformations: { email: 'test@example.com', phone: '123456789' },
    settings: { timezone: 'UTC', currency: 'USD' },
};

const tenantDTO: TenantDTO = {
    id: 1,
    name: 'Test Tenant',
    contactInformations: { email: 'test@example.com', phone: '123456789' },
    settings: { timezone: 'UTC', currency: 'USD' },
};

describe('TenantRepository', () => {
    let tenantRepository: TenantRepository;
    let repository: Repository<TenantEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TenantRepository,
                {
                    provide: getRepositoryToken(TenantEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        tenantRepository = module.get<TenantRepository>(TenantRepository);
        repository = module.get<Repository<TenantEntity>>(getRepositoryToken(TenantEntity));
    });

    it('should be defined', () => {
        expect(tenantRepository).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of tenants', async () => {
            jest.spyOn(repository, 'find').mockResolvedValue([tenantEntity]);
            const result = await tenantRepository.getAll();
            expect(result).toEqual([tenantDTO]);
        });
    });

    describe('getById', () => {
        it('should return a tenant by id', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(tenantEntity);
            const result = await tenantRepository.getById(1);
            expect(result).toEqual(tenantDTO);
        });
    });

    describe('add', () => {
        it('should add a new tenant', async () => {
            jest.spyOn(repository, 'create').mockReturnValue(tenantEntity);
            jest.spyOn(repository, 'save').mockResolvedValue(tenantEntity);
            const result = await tenantRepository.add(createTenantDTO);
            expect(result).toEqual(tenantDTO);
        });
    });

    describe('update', () => {
        it('should update an existing tenant', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(tenantEntity);
            jest.spyOn(repository, 'merge').mockReturnValue(tenantEntity);
            jest.spyOn(repository, 'save').mockResolvedValue(tenantEntity);
            const result = await tenantRepository.update(1, createTenantDTO);
            expect(result).toEqual(tenantDTO);
        });
    });

    describe('delete', () => {
        it('should delete a tenant by id', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(tenantEntity);
            jest.spyOn(repository, 'remove').mockResolvedValue(tenantEntity);
            const result = await tenantRepository.delete(1);
            expect(result).toEqual(tenantDTO);
        });
    });
});