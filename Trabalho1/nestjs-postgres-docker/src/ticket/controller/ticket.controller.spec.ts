import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';
import { TicketService } from '../service/ticket.service';
import { TicketDTO } from '../dto/ticket.dto';
import { CreateTicketDTO } from '../dto/create-ticket.dto';

describe('TicketController', () => {
  let controller: TicketController;
  let service: TicketService;

  const mockTicketService = {
    getAllTickets: jest.fn(),
    getTicketById: jest.fn(),
    createTicket: jest.fn(),
    updateTicket: jest.fn(),
    deleteTicket: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    controller = module.get<TicketController>(TicketController);
    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTickets', () => {
    it('should return an array of tickets', async () => {
      const result: TicketDTO[] = [{ id: 1, eventId: 1, tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' }];
      mockTicketService.getAllTickets.mockResolvedValue(result);

      expect(await controller.getAllTickets()).toBe(result);
    });
  });

  describe('getTicketById', () => {
    it('should return a ticket by ID', async () => {
      const result: TicketDTO = { id: 1, eventId: 1, tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' };
      mockTicketService.getTicketById.mockResolvedValue(result);

      expect(await controller.getTicketById(1)).toBe(result);
    });
  });

  describe('createTicket', () => {
    it('should create and return a new ticket', async () => {
      const createTicketDTO: CreateTicketDTO = { eventId: 1, tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' };
      const result: TicketDTO = { id: 1, ...createTicketDTO };
      mockTicketService.createTicket.mockResolvedValue(result);

      expect(await controller.createTicket(createTicketDTO)).toBe(result);
    });
  });

  describe('updateTicket', () => {
    it('should update and return the ticket', async () => {
      const updateTicketDTO: CreateTicketDTO = { eventId: 1, tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' };
      const result: TicketDTO = { id: 1, ...updateTicketDTO };
      mockTicketService.updateTicket.mockResolvedValue(result);

      expect(await controller.updateTicket(1, updateTicketDTO)).toBe(result);
    });
  });

  describe('deleteTicket', () => {
    it('should delete and return the deleted ticket', async () => {
      const result: TicketDTO = { id: 1, eventId: 1, tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' };
      mockTicketService.deleteTicket.mockResolvedValue(result);

      expect(await controller.deleteTicket(1)).toBe(result);
    });
  });
});