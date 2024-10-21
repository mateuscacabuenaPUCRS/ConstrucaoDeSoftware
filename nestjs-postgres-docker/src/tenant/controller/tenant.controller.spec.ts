import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from '../service/tenant.service';
import { TenantDTO } from '../dto/tenant.dto';
import { CreateTenantDTO } from '../dto/create-tenant.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TenantController', () => {
    let controller: TenantController;
    let service: TenantService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TenantController],
            providers: [
                {
                    provide: TenantService,
                    useValue: {
                        getAllTenants: jest.fn(),
                        getTenantById: jest.fn(),
                        createTenant: jest.fn(),
                        updateTenant: jest.fn(),
                        deleteTenant: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<TenantController>(TenantController);
        service = module.get<TenantService>(TenantService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllTenants', () => {
        it('should return an array of tenants', async () => {
            const result: TenantDTO[] = [{
                id: 1, name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            }];
            jest.spyOn(service, 'getAllTenants').mockResolvedValue(result);

            expect(await controller.getAllTenants()).toBe(result);
        });

        it('should throw an exception if service fails', async () => {
            jest.spyOn(service, 'getAllTenants').mockRejectedValue(new Error());

            await expect(controller.getAllTenants()).rejects.toThrow(
                new HttpException('Failed to get tenants', HttpStatus.INTERNAL_SERVER_ERROR),
            );
        });
    });

    describe('getTenantById', () => {
        it('should return a tenant by id', async () => {
            const result: TenantDTO = {
                id: 1, name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            };
            jest.spyOn(service, 'getTenantById').mockResolvedValue(result);

            expect(await controller.getTenantById(1)).toBe(result);
        });

        it('should throw not found exception if tenant does not exist', async () => {
            jest.spyOn(service, 'getTenantById').mockResolvedValue(null);

            await expect(controller.getTenantById(1)).rejects.toThrow(
                new HttpException('Tenant not found', HttpStatus.NOT_FOUND),
            );
        });

        it('should throw an exception if service fails', async () => {
            jest.spyOn(service, 'getTenantById').mockRejectedValue(new Error());

            await expect(controller.getTenantById(1)).rejects.toThrow(
                new HttpException('Failed to get tenant', HttpStatus.INTERNAL_SERVER_ERROR),
            );
        });
    });

    describe('createTenant', () => {
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
            const result: TenantDTO = {
                id: 1, name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            };
            jest.spyOn(service, 'createTenant').mockResolvedValue(result);

            expect(await controller.createTenant(createTenantDTO)).toBe(result);
        });

        it('should throw bad request exception if name is missing', async () => {
            const createTenantDTO: CreateTenantDTO = {
                name: '',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            };

            await expect(controller.createTenant(createTenantDTO)).rejects.toThrow(
                new HttpException('Tenant name is required', HttpStatus.BAD_REQUEST),
            );
        });

        it('should throw an exception if service fails', async () => {
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
            jest.spyOn(service, 'createTenant').mockRejectedValue(new Error());

            await expect(controller.createTenant(createTenantDTO)).rejects.toThrow(
                new HttpException('Failed to create tenant', HttpStatus.INTERNAL_SERVER_ERROR),
            );
        });
    });

    describe('updateTenant', () => {
        it('should update a tenant', async () => {
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
            const result: TenantDTO = {
                id: 1, name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            };
            jest.spyOn(service, 'getTenantById').mockResolvedValue(result);
            jest.spyOn(service, 'updateTenant').mockResolvedValue(result);

            expect(await controller.updateTenant(1, createTenantDTO)).toBe(result);
        });

        it('should throw not found exception if tenant does not exist', async () => {
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
            jest.spyOn(service, 'getTenantById').mockResolvedValue(null);

            await expect(controller.updateTenant(1, createTenantDTO)).rejects.toThrow(
                new HttpException('Tenant not found', HttpStatus.NOT_FOUND),
            );
        });

        it('should throw an exception if service fails', async () => {
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
            jest.spyOn(service, 'getTenantById').mockResolvedValue({
                id: 1,
                name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            });
            jest.spyOn(service, 'updateTenant').mockRejectedValue(new Error());

            await expect(controller.updateTenant(1, createTenantDTO)).rejects.toThrow(
                new HttpException('Failed to update tenant', HttpStatus.INTERNAL_SERVER_ERROR),
            );
        });
    });

    describe('deleteTenant', () => {
        it('should delete a tenant', async () => {
            const result: TenantDTO = {
                id: 1, name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            };
            jest.spyOn(service, 'getTenantById').mockResolvedValue(result);
            jest.spyOn(service, 'deleteTenant').mockResolvedValue(result);

            expect(await controller.deleteTenant(1)).toBe(result);
        });

        it('should throw not found exception if tenant does not exist', async () => {
            jest.spyOn(service, 'getTenantById').mockResolvedValue(null);

            await expect(controller.deleteTenant(1)).rejects.toThrow(
                new HttpException('Tenant not found', HttpStatus.NOT_FOUND),
            );
        });

        it('should throw an exception if service fails', async () => {
            jest.spyOn(service, 'getTenantById').mockResolvedValue({
                id: 1,
                name: 'Tenant1',
                contactInformations: {
                    email: '',
                    phone: ''
                },
                settings: {
                    timezone: '',
                    currency: ''
                }
            });
            jest.spyOn(service, 'deleteTenant').mockRejectedValue(new Error());

            await expect(controller.deleteTenant(1)).rejects.toThrow(
                new HttpException('Failed to delete tenant', HttpStatus.INTERNAL_SERVER_ERROR),
            );
        });
    });
});