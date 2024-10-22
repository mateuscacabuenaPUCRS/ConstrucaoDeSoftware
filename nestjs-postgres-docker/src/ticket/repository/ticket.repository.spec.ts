import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDTO } from '../dto/create-ticket.dto';
import { TicketEntity } from '../entity/ticket.entity';
import { TicketRepository } from './ticket.repository';

describe('TicketRepository', () => {
  let ticketRepository: TicketRepository;
  let repository: Repository<TicketEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketRepository,
        {
          provide: getRepositoryToken(TicketEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    ticketRepository = module.get<TicketRepository>(TicketRepository);
    repository = module.get<Repository<TicketEntity>>(getRepositoryToken(TicketEntity));
  });

  it('should be defined', () => {
    expect(ticketRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of tickets', async () => {
      const tickets: TicketEntity[] = [
        {
          id: 1,
          originalPrice: 1000,
          verificationCode: 123456,
          status: 'available',
          eventId: 1,
          sellerId: 1,
          tenantId: 1,
          event: null,
          seller: null,
          transaction: null,
          tenant: null,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(tickets);

      expect(await ticketRepository.getAll()).toEqual(tickets.map(ticketRepository['toTicketDTO']));
    });
  });

  describe('getById', () => {
    it('should return a ticket by id', async () => {
      const ticket: TicketEntity = {
        id: 1,
        originalPrice: 1000,
        verificationCode: 123456,
        status: 'available',
        eventId: 1,
        sellerId: 1,
        tenantId: 1,
        event: null,
        seller: null,
        transaction: null,
        tenant: null,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(ticket);

      expect(await ticketRepository.getById(1)).toEqual(ticketRepository['toTicketDTO'](ticket));
    });
  });

  describe('add', () => {
    it('should add a new ticket', async () => {
      const createTicketDTO: CreateTicketDTO = {
        eventId: 1,
        tenantId: 1,
        sellerId: 1,
        originalPrice: 1000,
        verificationCode: 123456,
        status: 'available',
      };
      const ticket: TicketEntity = {
        id: 1,
        ...createTicketDTO,
        event: null,
        seller: null,
        transaction: null,
        tenant: null,
      };
      jest.spyOn(repository, 'create').mockReturnValue(ticket);
      jest.spyOn(repository, 'save').mockResolvedValue(ticket);

      expect(await ticketRepository.add(createTicketDTO)).toEqual(ticketRepository['toTicketDTO'](ticket));
    });
  });

  describe('update', () => {
    it('should update a ticket', async () => {
      const createTicketDTO: CreateTicketDTO = {
        eventId: 1,
        tenantId: 1,
        sellerId: 1,
        originalPrice: 1000,
        verificationCode: 123456,
        status: 'available',
      };
      const ticket: TicketEntity = {
        id: 1,
        ...createTicketDTO,
        event: null,
        seller: null,
        transaction: null,
        tenant: null,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(ticket);
      jest.spyOn(repository, 'merge').mockReturnValue(ticket);
      jest.spyOn(repository, 'save').mockResolvedValue(ticket);

      expect(await ticketRepository.update(1, createTicketDTO)).toEqual(ticketRepository['toTicketDTO'](ticket));
    });
  });

  describe('delete', () => {
    it('should delete a ticket', async () => {
      const ticket: TicketEntity = {
        id: 1,
        originalPrice: 1000,
        verificationCode: 123456,
        status: 'available',
        eventId: 1,
        sellerId: 1,
        tenantId: 1,
        event: null,
        seller: null,
        transaction: null,
        tenant: null,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(ticket);
      jest.spyOn(repository, 'remove').mockResolvedValue(ticket);

      expect(await ticketRepository.delete(1)).toEqual(ticketRepository['toTicketDTO'](ticket));
    });
  });

  describe('findAvailableTickets', () => {
    it('should return available tickets for an event', async () => {
      const tickets: TicketEntity[] = [
        {
          id: 1,
          originalPrice: 1000,
          verificationCode: 123456,
          status: 'available',
          eventId: 1,
          sellerId: 1,
          tenantId: 1,
          event: null,
          seller: null,
          transaction: null,
          tenant: null,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(tickets);

      expect(await ticketRepository.findAvailableTickets(1)).toEqual(tickets.map(ticketRepository['toTicketDTO']));
    });
  });

  describe('updateStatus', () => {
    it('should update the status of a ticket', async () => {
      const ticket: TicketEntity = {
        id: 1,
        originalPrice: 1000,
        verificationCode: 123456,
        status: 'available',
        eventId: 1,
        sellerId: 1,
        tenantId: 1,
        event: null,
        seller: null,
        transaction: null,
        tenant: null,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(ticket);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...ticket, status: 'sold' });

      expect(await ticketRepository.updateStatus(1, 'sold')).toEqual(ticketRepository['toTicketDTO']({ ...ticket, status: 'sold' }));
    });
  });

  describe('deleteAll', () => {
    it('should delete all tickets', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await ticketRepository.deleteAll();
      expect(repository.delete).toHaveBeenCalledWith({});
    });
  });

  describe('getUserTickets', () => {
    it('should return tickets for a user', async () => {
      const tickets: TicketEntity[] = [
        {
          id: 1,
          originalPrice: 1000,
          verificationCode: 123456,
          status: 'available',
          eventId: 1,
          sellerId: 1,
          tenantId: 1,
          event: null,
          seller: null,
          transaction: null,
          tenant: null,
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(tickets);

      expect(await ticketRepository.getUserTickets(1)).toEqual(tickets.map(ticketRepository['toTicketDTO']));
    });
  });
});