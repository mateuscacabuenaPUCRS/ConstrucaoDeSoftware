import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from './tenant.service';
import { TenantRepository } from '../repository/tenant.repository';
import { TenantDTO } from '../dto/tenant.dto';
import { CreateTenantDTO } from '../dto/create-tenant.dto';

describe('TenantService', () => {
    let service: TenantService;
    let repository: TenantRepository;

    const mockTenantRepository = {
        getAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Tenant1' }]),
        getById: jest.fn().mockResolvedValue({ id: 1, name: 'Tenant1' }),
        add: jest.fn().mockResolvedValue({ id: 1, name: 'Tenant1' }),
        update: jest.fn().mockResolvedValue({ id: 1, name: 'UpdatedTenant' }),
        delete: jest.fn().mockResolvedValue({ id: 1, name: 'DeletedTenant' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TenantService,
                { provide: TenantRepository, useValue: mockTenantRepository },
            ],
        }).compile();

        service = module.get<TenantService>(TenantService);
        repository = module.get<TenantRepository>(TenantRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all tenants', async () => {
        const result = await service.getAllTenants();
        expect(result).toEqual([{ id: 1, name: 'Tenant1' }]);
        expect(repository.getAll).toHaveBeenCalled();
    });

    it('should get tenant by id', async () => {
        const result = await service.getTenantById(1);
        expect(result).toEqual({ id: 1, name: 'Tenant1' });
        expect(repository.getById).toHaveBeenCalledWith(1);
    });

    it('should create a tenant', async () => {
        const createTenantDTO: CreateTenantDTO = {
            name: 'Tenant1',
            contactInformations: {
                email: '',
                phone: ''
            },
            settings: {
                timezone: '',
                currency: ''
            }
        };
        const result = await service.createTenant(createTenantDTO);
        expect(result).toEqual({ id: 1, name: 'Tenant1' });
        expect(repository.add).toHaveBeenCalledWith(createTenantDTO);
    });

    it('should update a tenant', async () => {
        const createTenantDTO: CreateTenantDTO = {
            name: 'UpdatedTenant',
            contactInformations: {
                email: '',
                phone: ''
            },
            settings: {
                timezone: '',
                currency: ''
            }
        };
        const result = await service.updateTenant(1, createTenantDTO);
        expect(result).toEqual({ id: 1, name: 'UpdatedTenant' });
        expect(repository.update).toHaveBeenCalledWith(1, createTenantDTO);
    });

    it('should delete a tenant', async () => {
        const result = await service.deleteTenant(1);
        expect(result).toEqual({ id: 1, name: 'DeletedTenant' });
        expect(repository.delete).toHaveBeenCalledWith(1);
    });
});