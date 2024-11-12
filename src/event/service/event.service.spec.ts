import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { EventRepository } from '../repository/event.repository';
import { TicketRepository } from '../../ticket/repository/ticket.repository';
import { EventDTO } from '../dto/event.dto';
import { CreateEventDTO } from '../dto/create-event.dto';
import { TicketDTO } from '../../ticket/dto/ticket.dto';

describe('EventService', () => {
    let service: EventService;
    let eventRepository: EventRepository;
    let ticketRepository: TicketRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventService,
                {
                    provide: EventRepository,
                    useValue: {
                        getAll: jest.fn(),
                        getById: jest.fn(),
                        add: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                        search: jest.fn(),
                    },
                },
                {
                    provide: TicketRepository,
                    useValue: {
                        findAvailableTickets: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EventService>(EventService);
        eventRepository = module.get<EventRepository>(EventRepository);
        ticketRepository = module.get<TicketRepository>(TicketRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all events', async () => {
        const result: EventDTO[] = [];
        jest.spyOn(eventRepository, 'getAll').mockResolvedValue(result);

        expect(await service.getAll()).toBe(result);
    });

    it('should get event by id', async () => {
        const result: EventDTO = new EventDTO();
        jest.spyOn(eventRepository, 'getById').mockResolvedValue(result);

        expect(await service.getEventById(1)).toBe(result);
    });

    it('should create an event', async () => {
        const createEventDTO: CreateEventDTO = new CreateEventDTO();
        const result: EventDTO = new EventDTO();
        jest.spyOn(eventRepository, 'add').mockResolvedValue(result);

        expect(await service.createEvent(createEventDTO)).toBe(result);
    });

    it('should update an event', async () => {
        const createEventDTO: CreateEventDTO = new CreateEventDTO();
        const result: EventDTO = new EventDTO();
        jest.spyOn(eventRepository, 'update').mockResolvedValue(result);

        expect(await service.updateEvent(1, createEventDTO)).toBe(result);
    });

    it('should delete an event', async () => {
        const result: EventDTO = new EventDTO();
        jest.spyOn(eventRepository, 'delete').mockResolvedValue(result);

        expect(await service.deleteEvent(1)).toBe(result);
    });

    it('should search events by name', async () => {
        const result: EventDTO[] = [];
        jest.spyOn(eventRepository, 'search').mockResolvedValue(result);

        expect(await service.search('test')).toBe(result);
    });

    it('should get available tickets for an event', async () => {
        const result: TicketDTO[] = [];
        jest.spyOn(ticketRepository, 'findAvailableTickets').mockResolvedValue(result);

        expect(await service.getAvailableTickets(1)).toBe(result);
    });
});