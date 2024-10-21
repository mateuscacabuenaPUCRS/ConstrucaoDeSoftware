import { Repository } from "typeorm";
import { EventRepository } from "./event.repository";
import { EventEntity } from "../entity/event.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TenantEntity } from "../../tenant/entity/tenant.entity";
import { CreateEventDTO } from "../dto/create-event.dto";

describe("EventRepository", () => {
  let eventRepository: EventRepository;
  let repository: Repository<EventEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventRepository,
        {
          provide: getRepositoryToken(EventEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    eventRepository = module.get<EventRepository>(EventRepository);
    repository = module.get<Repository<EventEntity>>(
      getRepositoryToken(EventEntity)
    );
  });

  it("should be defined", () => {
    expect(eventRepository).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array of events", async () => {
      const eventEntities: EventEntity[] = [
        {
          id: 1,
          name: "Event 1",
          type: "Type 1",
          location: "Location 1",
          createdAt: new Date(),
          tenantId: 1,
          tickets: [],
          tenant: new TenantEntity(),
        },
        {
          id: 2,
          name: "Event 2",
          type: "Type 2",
          location: "Location 2",
          createdAt: new Date(),
          tenantId: 2,
          tickets: [],
          tenant: new TenantEntity(),
        },
      ];
      jest.spyOn(repository, "find").mockResolvedValue(eventEntities);

      const result = await eventRepository.getAll();
      expect(result).toEqual(
        eventEntities.map((event) => ({
          id: event.id,
          name: event.name,
          type: event.type,
          location: event.location,
          createdAt: event.createdAt,
          tenantId: event.tenantId,
        }))
      );
    });
  });

  describe("getById", () => {
    it("should return a single event by id", async () => {
      const eventEntity: EventEntity = {
        id: 1,
        name: "Event 1",
        type: "Type 1",
        location: "Location 1",
        createdAt: new Date(),
        tenantId: 1,
        tickets: [],
        tenant: new TenantEntity(),
      };
      jest.spyOn(repository, "findOne").mockResolvedValue(eventEntity);

      const result = await eventRepository.getById(1);
      expect(result).toEqual({
        id: eventEntity.id,
        name: eventEntity.name,
        type: eventEntity.type,
        location: eventEntity.location,
        createdAt: eventEntity.createdAt,
        tenantId: eventEntity.tenantId,
      });
    });
  });

  describe("add", () => {
    it("should add a new event", async () => {
      const createEventDTO: CreateEventDTO = {
        name: "New Event",
        type: "New Type",
        location: "New Location",
        tenantId: 0,
      };
      const eventEntity: EventEntity = {
        id: 1,
        ...createEventDTO,
        createdAt: new Date(),
        tenantId: 1,
        tickets: [],
        tenant: new TenantEntity(),
      };
      jest.spyOn(repository, "create").mockReturnValue(eventEntity);
      jest.spyOn(repository, "save").mockResolvedValue(eventEntity);

      const result = await eventRepository.add(createEventDTO);
      expect(result).toEqual({
        id: eventEntity.id,
        name: eventEntity.name,
        type: eventEntity.type,
        location: eventEntity.location,
        createdAt: eventEntity.createdAt,
        tenantId: eventEntity.tenantId,
      });
    });
  });

  describe("update", () => {
    it("should update an existing event", async () => {
      const createEventDTO: CreateEventDTO = {
        name: "Updated Event",
        type: "Updated Type",
        location: "Updated Location",
        tenantId: 0,
      };
      const eventEntity: EventEntity = {
        id: 1,
        name: "Old Event",
        type: "Old Type",
        location: "Old Location",
        createdAt: new Date(),
        tenantId: 1,
        tickets: [],
        tenant: new TenantEntity(),
      };
      jest.spyOn(repository, "findOne").mockResolvedValue(eventEntity);
      jest
        .spyOn(repository, "save")
        .mockResolvedValue({ ...eventEntity, ...createEventDTO });

      const result = await eventRepository.update(1, createEventDTO);
      expect(result).toEqual({
        id: eventEntity.id,
        name: createEventDTO.name,
        type: createEventDTO.type,
        location: createEventDTO.location,
        createdAt: eventEntity.createdAt,
        tenantId: eventEntity.tenantId,
      });
    });
  });

  describe("delete", () => {
    it("should delete an event", async () => {
      const eventEntity: EventEntity = {
        id: 1,
        name: "Event to Delete",
        type: "Type",
        location: "Location",
        createdAt: new Date(),
        tenantId: 1,
        tickets: [],
        tenant: new TenantEntity(),
      };
      jest.spyOn(repository, "findOne").mockResolvedValue(eventEntity);
      jest.spyOn(repository, "remove").mockResolvedValue(eventEntity);

      const result = await eventRepository.delete(1);
      expect(result).toEqual({
        id: eventEntity.id,
        name: eventEntity.name,
        type: eventEntity.type,
        location: eventEntity.location,
        createdAt: eventEntity.createdAt,
        tenantId: eventEntity.tenantId,
      });
    });
  });

  describe("search", () => {
    it("should return events matching the search criteria", async () => {
      const eventEntities: EventEntity[] = [
        {
          id: 1,
          name: "Event 1",
          type: "Type 1",
          location: "Location 1",
          createdAt: new Date(),
          tenantId: 1,
          tickets: [],
          tenant: new TenantEntity(),
        },
        {
          id: 2,
          name: "Event 1",
          type: "Type 2",
          location: "Location 2",
          createdAt: new Date(),
          tenantId: 2,
          tickets: [],
          tenant: new TenantEntity(),
        },
      ];
      jest.spyOn(repository, "find").mockResolvedValue(eventEntities);

      const result = await eventRepository.search("Event 1");
      expect(result).toEqual(
        eventEntities.map((event) => ({
          id: event.id,
          name: event.name,
          type: event.type,
          location: event.location,
          createdAt: event.createdAt,
          tenantId: event.tenantId,
        }))
      );
    });
  });
});
