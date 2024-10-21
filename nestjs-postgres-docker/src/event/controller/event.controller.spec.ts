import { HttpException, HttpStatus } from "@nestjs/common";
import { EventDTO } from "../dto/event.dto";
import { EventService } from "../service/event.service";
import { EventController } from "./event.controller";
import { CreateEventDTO } from "../dto/create-event.dto";
import { Test, TestingModule } from "@nestjs/testing";

describe("EventController", () => {
  let controller: EventController;
  let service: EventService;

  const mockEventService = {
    getAll: jest.fn(),
    getEventById: jest.fn(),
    createEvent: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventService,
          useValue: mockEventService,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    service = module.get<EventService>(EventService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array of events", async () => {
      const result: EventDTO[] = [{ id: 1, name: "Event 1" } as EventDTO];
      mockEventService.getAll.mockResolvedValue(result);

      expect(await controller.getAll()).toBe(result);
    });

    it("should throw an internal server error if service fails", async () => {
      mockEventService.getAll.mockRejectedValue(new Error("Error"));

      await expect(controller.getAll()).rejects.toThrow(HttpException);
    });
  });

  describe("getEventById", () => {
    it("should return an event by ID", async () => {
      const result: EventDTO = { id: 1, name: "Event 1" } as EventDTO;
      mockEventService.getEventById.mockResolvedValue(result);

      expect(await controller.getEventById(1)).toBe(result);
    });

    it("should throw a 404 error if event not found", async () => {
      mockEventService.getEventById.mockResolvedValue(null);

      await expect(controller.getEventById(1)).rejects.toThrow(
        new HttpException("Event not found", HttpStatus.NOT_FOUND)
      );
    });
  });

  describe("createEvent", () => {
    it("should create and return a new event", async () => {
      const createEventDTO: CreateEventDTO = {
        name: "New Event",
        tenantId: 0,
        type: "",
        location: "",
      };
      const result: EventDTO = { id: 1, name: "New Event" } as EventDTO;
      mockEventService.createEvent.mockResolvedValue(result);

      expect(await controller.createEvent(createEventDTO)).toBe(result);
    });

    it("should throw a 400 error if event name is not provided", async () => {
      const createEventDTO: CreateEventDTO = {
        name: "",
        tenantId: 0,
        type: "",
        location: "",
      };

      await expect(controller.createEvent(createEventDTO)).rejects.toThrow(
        new HttpException("Event name is required", HttpStatus.BAD_REQUEST)
      );
    });
  });

  describe("updateEvent", () => {
    it("should update and return the event", async () => {
      const updateEventDTO: CreateEventDTO = {
        name: "Updated Event",
        tenantId: 0,
        type: "",
        location: "",
      };
      const result: EventDTO = { id: 1, name: "Updated Event" } as EventDTO;
      mockEventService.getEventById.mockResolvedValue(result);
      mockEventService.updateEvent.mockResolvedValue(result);

      expect(await controller.updateEvent(1, updateEventDTO)).toBe(result);
    });

    it("should throw a 404 error if event is not found", async () => {
      const updateEventDTO: CreateEventDTO = {
        name: "Updated Event",
        tenantId: 0,
        type: "",
        location: "",
      };
      mockEventService.getEventById.mockResolvedValue(null);

      await expect(controller.updateEvent(1, updateEventDTO)).rejects.toThrow(
        new HttpException("Event not found", HttpStatus.NOT_FOUND)
      );
    });
  });

  describe("deleteEvent", () => {
    it("should delete and return the deleted event", async () => {
      const result: EventDTO = {
        id: 1,
        name: "Event to be deleted",
      } as EventDTO;
      mockEventService.getEventById.mockResolvedValue(result);
      mockEventService.deleteEvent.mockResolvedValue(result);

      expect(await controller.deleteEvent(1)).toBe(result);
    });

    it("should throw a 404 error if event is not found", async () => {
      mockEventService.getEventById.mockResolvedValue(null);

      await expect(controller.deleteEvent(1)).rejects.toThrow(
        new HttpException("Event not found", HttpStatus.NOT_FOUND)
      );
    });
  });
});
