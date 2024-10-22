import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from '../../transaction/repository/transaction.repository';
import { CreateTicketDTO } from '../dto/create-ticket.dto';
import { TicketRepository } from '../repository/ticket.repository';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;
  let ticketRepository: TicketRepository;
  let transactionRepository: TransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: TicketRepository,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            add: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            deleteAll: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
        {
          provide: TransactionRepository,
          useValue: {
            getByTicketId: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    ticketRepository = module.get<TicketRepository>(TicketRepository);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all tickets', async () => {
    const tickets = [{
      id: 1,
      eventId: 1,
      tenantId: 1,
      sellerId: 1,
      originalPrice: 1000,
      verificationCode: 123456,
      status: 'available'
    }];
    jest.spyOn(ticketRepository, 'getAll').mockResolvedValue(tickets);

    expect(await service.getAllTickets()).toBe(tickets);
  });

  it('should get a ticket by id', async () => {
    const ticket = { id: 1, eventId: 1, tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' };
    jest.spyOn(ticketRepository, 'getById').mockResolvedValue(ticket);

    expect(await service.getTicketById(1)).toBe(ticket);
  });

  it('should create a ticket', async () => {
    const createTicketDTO: CreateTicketDTO = {
      eventId: 1,
      tenantId: 1,
      sellerId: 1,
      originalPrice: 1000,
      verificationCode: 123456,
      status: 'available',
    };
    const ticket = { id: 1, ...createTicketDTO };
    jest.spyOn(ticketRepository, 'add').mockResolvedValue(ticket);

    expect(await service.createTicket(createTicketDTO)).toBe(ticket);
  });

  it('should update a ticket', async () => {
    const createTicketDTO: CreateTicketDTO = {
      eventId: 1,
      tenantId: 1,
      sellerId: 1,
      originalPrice: 1000,
      verificationCode: 123456,
      status: 'available',
    };
    const ticket = { id: 1, ...createTicketDTO };
    jest.spyOn(ticketRepository, 'update').mockResolvedValue(ticket);

    expect(await service.updateTicket(1, createTicketDTO)).toBe(ticket);
  });

  it('should delete a ticket', async () => {
    jest.spyOn(ticketRepository, 'delete').mockResolvedValue(undefined);

    expect(await service.deleteTicket(1)).toBeUndefined();
  });

  it('should delete all tickets', async () => {
    jest.spyOn(ticketRepository, 'deleteAll').mockResolvedValue(undefined);

    expect(await service.deleteAllTickets()).toBeUndefined();
  });

  it('should refund a ticket', async () => {
    const transaction = { id: 1, ticketId: 1, tenantId: 1, buyerId: 1, salesPrice: 1000, createdAt: new Date(), status: 'sold' };
    jest.spyOn(transactionRepository, 'getByTicketId').mockResolvedValue(transaction);
    jest.spyOn(transactionRepository, 'delete').mockResolvedValue(undefined);
    jest.spyOn(ticketRepository, 'updateStatus').mockResolvedValue({
      id: 1,
      eventId: 1,
      tenantId: 1,
      sellerId: 1,
      originalPrice: 1000,
      verificationCode: 123456,
      status: 'available'
    });

    expect(await service.refundTicket(1)).toEqual({ id: 1, eventId:1 , tenantId: 1, sellerId: 1, originalPrice: 1000, verificationCode: 123456, status: 'available' });
  });
});