// import { Repository } from "typeorm";
// import { TicketRepository } from "./ticket.repository";
// import { TicketEntity } from "../entity/ticket.entity";
// import { Test, TestingModule } from "@nestjs/testing";
// import { getRepositoryToken } from "@nestjs/typeorm";
// import { CreateTicketDTO } from "../dto/create-ticket.dto";
// import { EventEntity } from "../../event/entity/event.entity";
// import { UserEntity } from "../../user/entity/user.entity";
// import { TransactionEntity } from "../../transaction/entity/transaction.entity";

// describe("TicketRepository", () => {
//   let ticketRepository: TicketRepository;
//   let repository: Repository<TicketEntity>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         TicketRepository,
//         {
//           provide: getRepositoryToken(TicketEntity),
//           useClass: Repository,
//         },
//       ],
//     }).compile();

//     ticketRepository = module.get<TicketRepository>(TicketRepository);
//     repository = module.get<Repository<TicketEntity>>(
//       getRepositoryToken(TicketEntity)
//     );
//   });

//   it("should be defined", () => {
//     expect(ticketRepository).toBeDefined();
//   });

//   describe("getAll", () => {
//     it("should return an array of tickets", async () => {
//       const ticketEntities: TicketEntity[] = [
//         {
//           id: 1,
//           eventId: 1,
//           sellerId: 1,
//           originalPrice: 1000,
//           verificationCode: 123456,
//           status: "AVAILABLE",
//           event: new EventEntity(),
//           seller: new UserEntity(),
//           transaction: new TransactionEntity(),
//         },
//         {
//           id: 2,
//           eventId: 2,
//           sellerId: 2,
//           originalPrice: 2000,
//           verificationCode: 654321,
//           status: "AVAILABLE",
//           event: new EventEntity(),
//           seller: new UserEntity(),
//           transaction: new TransactionEntity(),
//         },
//       ];
//       jest.spyOn(repository, "find").mockResolvedValue(ticketEntities);

//       const result = await ticketRepository.getAll();
//       expect(result).toEqual(
//         ticketEntities.map((ticket) => ({
//           id: ticket.id,
//           eventId: ticket.eventId,
//           sellerId: ticket.sellerId,
//           originalPrice: ticket.originalPrice,
//           verificationCode: ticket.verificationCode,
//           status: ticket.status,
//         }))
//       );
//     });
//   });

//   describe("getById", () => {
//     it("should return a single ticket by id", async () => {
//       const ticketEntity: TicketEntity = {
//         id: 1,
//         eventId: 1,
//         sellerId: 1,
//         originalPrice: 1000,
//         verificationCode: 123456,
//         status: "AVAILABLE",
//         event: new EventEntity(),
//         seller: new UserEntity(),
//         transaction: new TransactionEntity(),
//       };
//       jest.spyOn(repository, "findOne").mockResolvedValue(ticketEntity);

//       const result = await ticketRepository.getById(1);
//       expect(result).toEqual({
//         id: ticketEntity.id,
//         eventId: ticketEntity.eventId,
//         sellerId: ticketEntity.sellerId,
//         originalPrice: ticketEntity.originalPrice,
//         verificationCode: ticketEntity.verificationCode,
//         status: ticketEntity.status,
//       });
//     });
//   });

//   describe("add", () => {
//     it("should add a new ticket", async () => {
//       const createTicketDTO: CreateTicketDTO = {
//         eventId: 1,
//         tenantId: 1,
//         sellerId: 1,
//         originalPrice: 1000,
//         verificationCode: 123456,
//         status: "AVAILABLE",
//       };
//       const ticketEntity: TicketEntity = {
//         id: 1,
//         eventId: 1,
//         sellerId: 1,
//         originalPrice: 1000,
//         verificationCode: 123456,
//         status: "AVAILABLE",
//         event: null,
//         seller: null,
//         transaction: null,
//       };
//       jest.spyOn(repository, "create").mockReturnValue(ticketEntity);
//       jest.spyOn(repository, "save").mockResolvedValue(ticketEntity);

//       const result = await ticketRepository.add(createTicketDTO);
//       expect(result).toEqual({
//         id: ticketEntity.id,
//         eventId: ticketEntity.eventId,
//         tenantId: createTicketDTO.tenantId,
//         sellerId: ticketEntity.sellerId,
//         originalPrice: ticketEntity.originalPrice,
//         verificationCode: ticketEntity.verificationCode,
//         status: ticketEntity.status,
//       });
//     });
//   });

//   describe("TicketRepository", () => {
//     let ticketRepository: TicketRepository;
//     let repository: Repository<TicketEntity>;

//     beforeEach(async () => {
//       const module: TestingModule = await Test.createTestingModule({
//         providers: [
//           TicketRepository,
//           {
//             provide: getRepositoryToken(TicketEntity),
//             useClass: Repository,
//           },
//         ],
//       }).compile();

//       ticketRepository = module.get<TicketRepository>(TicketRepository);
//       repository = module.get<Repository<TicketEntity>>(
//         getRepositoryToken(TicketEntity)
//       );
//     });

//     it("should be defined", () => {
//       expect(ticketRepository).toBeDefined();
//     });

//     describe("getAll", () => {
//       it("should return an array of tickets", async () => {
//         const ticketEntities: TicketEntity[] = [
//           {
//             id: 1,
//             eventId: 1,
//             sellerId: 1,
//             originalPrice: 1000,
//             verificationCode: 123456,
//             status: "AVAILABLE",
//             event: new EventEntity(),
//             seller: new UserEntity(),
//             transaction: new TransactionEntity(),
//           },
//           {
//             id: 2,
//             eventId: 2,
//             sellerId: 2,
//             originalPrice: 2000,
//             verificationCode: 654321,
//             status: "AVAILABLE",
//             event: new EventEntity(),
//             seller: new UserEntity(),
//             transaction: new TransactionEntity(),
//           },
//         ];
//         jest.spyOn(repository, "find").mockResolvedValue(ticketEntities);

//         const result = await ticketRepository.getAll();
//         expect(result).toEqual(
//           ticketEntities.map((ticket) => ({
//             id: ticket.id,
//             eventId: ticket.eventId,
//             sellerId: ticket.sellerId,
//             originalPrice: ticket.originalPrice,
//             verificationCode: ticket.verificationCode,
//             status: ticket.status,
//           }))
//         );
//       });
//     });

//     describe("getById", () => {
//       it("should return a single ticket by id", async () => {
//         const ticketEntity: TicketEntity = {
//           id: 1,
//           eventId: 1,
//           sellerId: 1,
//           originalPrice: 1000,
//           verificationCode: 123456,
//           status: "AVAILABLE",
//           event: new EventEntity(),
//           seller: new UserEntity(),
//           transaction: new TransactionEntity(),
//         };
//         jest.spyOn(repository, "findOne").mockResolvedValue(ticketEntity);

//         const result = await ticketRepository.getById(1);
//         expect(result).toEqual({
//           id: ticketEntity.id,
//           eventId: ticketEntity.eventId,
//           sellerId: ticketEntity.sellerId,
//           originalPrice: ticketEntity.originalPrice,
//           verificationCode: ticketEntity.verificationCode,
//           status: ticketEntity.status,
//         });
//       });
//     });

//     describe("add", () => {
//       it("should add a new ticket", async () => {
//         const createTicketDTO: CreateTicketDTO = {
//           eventId: 1,
//           tenantId: 1,
//           sellerId: 1,
//           originalPrice: 1000,
//           verificationCode: 123456,
//           status: "AVAILABLE",
//         };
//         const ticketEntity: TicketEntity = {
//           id: 1,
//           eventId: 1,
//           sellerId: 1,
//           originalPrice: 1000,
//           verificationCode: 123456,
//           status: "AVAILABLE",
//           event: null,
//           seller: null,
//           transaction: null,
//         };
//         jest.spyOn(repository, "create").mockReturnValue(ticketEntity);
//         jest.spyOn(repository, "save").mockResolvedValue(ticketEntity);

//         const result = await ticketRepository.add(createTicketDTO);
//         expect(result).toEqual({
//           id: ticketEntity.id,
//           eventId: ticketEntity.eventId,
//           tenantId: createTicketDTO.tenantId,
//           sellerId: ticketEntity.sellerId,
//           originalPrice: ticketEntity.originalPrice,
//           verificationCode: ticketEntity.verificationCode,
//           status: ticketEntity.status,
//         });
//       });
//     });

//     // describe("update", () => {
//     //   it("should update an existing ticket", async () => {
//     //     const ticketEntity: TicketEntity = {
//     //       id: 1,
//     //       eventId: 1,
//     //       sellerId: 1,
//     //       originalPrice: 1000,
//     //       verificationCode: 123456,
//     //       status: "AVAILABLE",
//     //       event: new EventEntity(),
//     //       seller: new UserEntity(),
//     //       transaction: new TransactionEntity(),
//     //     };
//     //     const updateTicketDTO: CreateTicketDTO = {
//     //       eventId: 1,
//     //       tenantId: 1,
//     //       sellerId: 1,
//     //       originalPrice: 2000,
//     //       verificationCode: 654321,
//     //       status: "AVAILABLE",
//     //     };
  
//     //     jest.spyOn(repository, "findOne").mockResolvedValue(ticketEntity);
//     //     jest.spyOn(repository, "merge").mockReturnValue(ticketEntity);
//     //     jest.spyOn(repository, "save").mockResolvedValue(ticketEntity);
        
//     //     const result = await ticketRepository.update(1, updateTicketDTO);
//     //     expect(result).toEqual({
//     //       id: ticketEntity.id,
//     //       eventId: ticketEntity.eventId,
//     //       tenantId: updateTicketDTO.tenantId,
//     //       sellerId: ticketEntity.sellerId,
//     //       originalPrice: updateTicketDTO.originalPrice,
//     //       verificationCode: updateTicketDTO.verificationCode,
//     //       status: updateTicketDTO.status,
//     //     });
//     //   });  
//     //   });

//     describe("delete", () => {
//       it("should delete a ticket", async () => {
//         const ticketEntity: TicketEntity = {
//           id: 1,
//           eventId: 1,
//           sellerId: 1,
//           originalPrice: 1000,
//           verificationCode: 123456,
//           status: "AVAILABLE",
//           event: new EventEntity(),
//           seller: new UserEntity(),
//           transaction: new TransactionEntity(),
//         };
//         jest.spyOn(repository, "findOne").mockResolvedValue(ticketEntity);
//         jest.spyOn(repository, "remove").mockResolvedValue(ticketEntity);

//         const result = await ticketRepository.delete(1);
//         expect(result).toEqual({
//           id: ticketEntity.id,
//           eventId: ticketEntity.eventId,
//           sellerId: ticketEntity.sellerId,
//           originalPrice: ticketEntity.originalPrice,
//           verificationCode: ticketEntity.verificationCode,
//           status: ticketEntity.status,
//         });
//       });
//     });

//     describe("findAvailableTickets", () => {
//       it("should return available tickets for a specific event", async () => {
//         const ticketEntities: TicketEntity[] = [
//           {
//             id: 1,
//             eventId: 1,
//             sellerId: 1,
//             originalPrice: 1000,
//             verificationCode: 123456,
//             status: "AVAILABLE",
//             event: new EventEntity(),
//             seller: new UserEntity(),
//             transaction: new TransactionEntity(),
//           },
//           {
//             id: 2,
//             eventId: 1,
//             sellerId: 2,
//             originalPrice: 2000,
//             verificationCode: 654321,
//             status: "AVAILABLE",
//             event: new EventEntity(),
//             seller: new UserEntity(),
//             transaction: new TransactionEntity(),
//           },
//         ];
//         jest.spyOn(repository, "find").mockResolvedValue(ticketEntities);

//         const result = await ticketRepository.findAvailableTickets(1);
//         expect(result).toEqual(
//           ticketEntities.map((ticket) => ({
//             id: ticket.id,
//             eventId: ticket.eventId,
//             sellerId: ticket.sellerId,
//             originalPrice: ticket.originalPrice,
//             verificationCode: ticket.verificationCode,
//             status: ticket.status,
//           }))
//         );
//       });
//     });

//     describe("updateTicketAvailability", () => {
//       it("should update the availability of tickets", async () => {
//         const ticketIds = [1, 2];
//         jest.spyOn(repository, "update").mockResolvedValue(undefined);

//         await ticketRepository.updateTicketAvailability(ticketIds);
//         expect(repository.update).toHaveBeenCalledWith(ticketIds, { status: "" });
//       });
//     });
//   });

//   describe("delete", () => {
//     it("should delete a ticket", async () => {
//       const ticketEntity: TicketEntity = {
//         id: 1,
//         eventId: 1,
//         sellerId: 1,
//         originalPrice: 1000,
//         verificationCode: 123456,
//         status: "AVAILABLE",
//         event: new EventEntity(),
//         seller: new UserEntity(),
//         transaction: new TransactionEntity(),
//       };
//       jest.spyOn(repository, "findOne").mockResolvedValue(ticketEntity);
//       jest.spyOn(repository, "remove").mockResolvedValue(ticketEntity);

//       const result = await ticketRepository.delete(1);
//       expect(result).toEqual({
//         id: ticketEntity.id,
//         eventId: ticketEntity.eventId,
//         sellerId: ticketEntity.sellerId,
//         originalPrice: ticketEntity.originalPrice,
//         verificationCode: ticketEntity.verificationCode,
//         status: ticketEntity.status,
//       });
//     });
//   });

//   describe("findAvailableTickets", () => {
//     it("should return available tickets for a specific event", async () => {
//       const ticketEntities: TicketEntity[] = [
//         {
//           id: 1,
//           eventId: 1,
//           sellerId: 1,
//           originalPrice: 1000,
//           verificationCode: 123456,
//           status: "AVAILABLE",
//           event: new EventEntity(),
//           seller: new UserEntity(),
//           transaction: new TransactionEntity(),
//         },
//         {
//           id: 2,
//           eventId: 1,
//           sellerId: 2,
//           originalPrice: 2000,
//           verificationCode: 654321,
//           status: "AVAILABLE",
//           event: new EventEntity(),
//           seller: new UserEntity(),
//           transaction: new TransactionEntity(),
//         },
//       ];
//       jest.spyOn(repository, "find").mockResolvedValue(ticketEntities);

//       const result = await ticketRepository.findAvailableTickets(1);
//       expect(result).toEqual(
//         ticketEntities.map((ticket) => ({
//           id: ticket.id,
//           eventId: ticket.eventId,
//           sellerId: ticket.sellerId,
//           originalPrice: ticket.originalPrice,
//           verificationCode: ticket.verificationCode,
//           status: ticket.status,
//         }))
//       );
//     });
//   });

//   describe("updateTicketAvailability", () => {
//     it("should update the availability of tickets", async () => {
//       const ticketIds = [1, 2];
//       jest.spyOn(repository, "update").mockResolvedValue(undefined);

//       await ticketRepository.updateTicketAvailability(ticketIds);
//       expect(repository.update).toHaveBeenCalledWith(ticketIds, { status: "" });
//     });
//   });
// });