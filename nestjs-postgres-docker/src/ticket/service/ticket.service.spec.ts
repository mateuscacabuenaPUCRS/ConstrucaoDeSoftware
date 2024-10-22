import { Test, TestingModule } from "@nestjs/testing";
import { TicketService } from "../service/ticket.service";
import { TicketRepository } from "../repository/ticket.repository";
import { CreateTicketDTO } from "../dto/create-ticket.dto";
import { TicketDTO } from "../dto/ticket.dto";

describe("TicketService", () => {
  let service: TicketService;
  let repository: TicketRepository;

  const mockTicketRepository = {
    getAll: jest.fn(),
    getById: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: TicketRepository,
          useValue: mockTicketRepository,
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
    repository = module.get<TicketRepository>(TicketRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get all tickets", async () => {
    const result: TicketDTO[] = [];
    jest.spyOn(repository, "getAll").mockResolvedValue(result);

    expect(await service.getAllTickets()).toBe(result);
  });

  it("should get a ticket by id", async () => {
    const result: TicketDTO = new TicketDTO();
    jest.spyOn(repository, "getById").mockResolvedValue(result);

    expect(await service.getTicketById(1)).toBe(result);
  });

  it("should create a ticket", async () => {
    const createTicketDTO: CreateTicketDTO = {
      eventId: 1,
      tenantId: 1,
      sellerId: 1,
      originalPrice: 1000,
      verificationCode: 123456,
      status: "AVAILABLE",
    };
    const result: TicketDTO = new TicketDTO();
    jest.spyOn(repository, "add").mockResolvedValue(result);

    expect(await service.createTicket(createTicketDTO)).toBe(result);
  });

  it("should update a ticket", async () => {
    const createTicketDTO: CreateTicketDTO = {
      eventId: 1,
      tenantId: 1,
      sellerId: 1,
      originalPrice: 1000,
      verificationCode: 123456,
      status: "AVAILABLE",
    };
    const result: TicketDTO = new TicketDTO();
    jest.spyOn(repository, "update").mockResolvedValue(result);

    expect(await service.updateTicket(1, createTicketDTO)).toBe(result);
  });

  it("should delete a ticket", async () => {
    const result: TicketDTO = new TicketDTO();
    jest.spyOn(repository, "delete").mockResolvedValue(result);

    expect(await service.deleteTicket(1)).toBe(result);
  });
});