import { Test, TestingModule } from '@nestjs/testing';
import { TicketDTO } from '../../ticket/dto/ticket.dto';
import { TicketRepository } from '../../ticket/repository/ticket.repository';
import { CreateTenantDTO } from '../dto/create-tenant.dto';
import { TenantDTO } from '../dto/tenant.dto';
import { TenantRepository } from '../repository/tenant.repository';
import { TenantService } from './tenant.service';

describe('TenantService', () => {
    let service: TenantService;
    let tenantRepository: TenantRepository;
    let ticketRepository: TicketRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TenantService,
                {
                    provide: TenantRepository,
                    useValue: {
                        getAll: jest.fn(),
                        getById: jest.fn(),
                        add: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
                {
                    provide: TicketRepository,
                    useValue: {
                        getById: jest.fn(),
                        updateStatus: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TenantService>(TenantService);
        tenantRepository = module.get<TenantRepository>(TenantRepository);
        ticketRepository = module.get<TicketRepository>(TicketRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllTenants', () => {
        it('should return an array of tenants', async () => {
            const result: TenantDTO[] = [];
            jest.spyOn(tenantRepository, 'getAll').mockResolvedValue(result);

            expect(await service.getAllTenants()).toBe(result);
        });
    });

    describe('getTenantById', () => {
        it('should return a tenant by id', async () => {
            const result: TenantDTO = new TenantDTO();
            jest.spyOn(tenantRepository, 'getById').mockResolvedValue(result);

            expect(await service.getTenantById(1)).toBe(result);
        });
    });

    describe('createTenant', () => {
        it('should create and return a tenant', async () => {
            const createTenantDTO: CreateTenantDTO = new CreateTenantDTO();
            const result: TenantDTO = new TenantDTO();
            jest.spyOn(tenantRepository, 'add').mockResolvedValue(result);

            expect(await service.createTenant(createTenantDTO)).toBe(result);
        });
    });

    describe('updateTenant', () => {
        it('should update and return a tenant', async () => {
            const createTenantDTO: CreateTenantDTO = new CreateTenantDTO();
            const result: TenantDTO = new TenantDTO();
            jest.spyOn(tenantRepository, 'update').mockResolvedValue(result);

            expect(await service.updateTenant(1, createTenantDTO)).toBe(result);
        });
    });

    describe('deleteTenant', () => {
        it('should delete and return a tenant', async () => {
            const result: TenantDTO = new TenantDTO();
            jest.spyOn(tenantRepository, 'delete').mockResolvedValue(result);

            expect(await service.deleteTenant(1)).toBe(result);
        });
    });

    describe('validateTicket', () => {
        it('should validate and update ticket status', async () => {
            const ticket: TicketDTO = { id: 1, verificationCode: 1234, status: 'sold' } as TicketDTO;
            const updatedTicket: TicketDTO = { ...ticket, status: 'used' };
            jest.spyOn(ticketRepository, 'getById').mockResolvedValue(ticket);
            jest.spyOn(ticketRepository, 'updateStatus').mockResolvedValue(updatedTicket);

            expect(await service.validateTicket(1, 1234)).toBe(updatedTicket);
        });

        it('should throw an error if verification code is invalid', async () => {
            const ticket: TicketDTO = { id: 1, verificationCode: 1234, status: 'sold' } as TicketDTO;
            jest.spyOn(ticketRepository, 'getById').mockResolvedValue(ticket);

            await expect(service.validateTicket(1, 5678)).rejects.toThrow('Invalid verification code');
        });

        it('should throw an error if ticket status is not sold', async () => {
            const ticket: TicketDTO = { id: 1, verificationCode: 1234, status: 'available' } as TicketDTO;
            jest.spyOn(ticketRepository, 'getById').mockResolvedValue(ticket);

            await expect(service.validateTicket(1, 1234)).rejects.toThrow('Ticket is not sold to be used');
        });
    });
});