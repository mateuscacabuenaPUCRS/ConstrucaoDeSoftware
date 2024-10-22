// import { HttpException, HttpStatus } from "@nestjs/common";
// import { Test, TestingModule } from "@nestjs/testing";
// import { EvaluationDTO } from "../dto/event.dto";
// import { EvaluationService } from "../service/event.service";
// import { EvaluationController } from "./evaluation.controller";
// import { SubmitEvaluationDTO } from "../dto/create-event.dto";

// describe("EvaluationController", () => {
//   let controller: EvaluationController;
//   let service: EvaluationService;

//   const mockEvaluationService = {
//     getAll: jest.fn(),
//     submitEvaluation: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EvaluationController],
//       providers: [
//         {
//           provide: EvaluationService,
//           useValue: mockEvaluationService,
//         },
//       ],
//     }).compile();

//     controller = module.get<EvaluationController>(EvaluationController);
//     service = module.get<EvaluationService>(EvaluationService);
//   });

//   it("should be defined", () => {
//     expect(controller).toBeDefined();
//   });

//   describe("getAll", () => {
//     it("should return an array of events", async () => {
//       const result: EvaluationDTO[] = [{ sellerId: 1 } as EvaluationDTO];
//       mockEvaluationService.getAll.mockResolvedValue(result);

//       expect(await controller.getAll()).toBe(result);
//     });

//     it("should throw an internal server error if service fails", async () => {
//       mockEvaluationService.getAll.mockRejectedValue(new Error("Error"));

//       await expect(controller.getAll()).rejects.toThrow(HttpException);
//     });
//   });

//   describe("createEvaluation", () => {
//     it("should create and return a new event", async () => {
//       const createEvaluationDTO: SubmitEvaluationDTO = {
//         name: "New Evaluation",
//         tenantId: 0,
//         type: "",
//         location: "",
//       };
//       const result: EvaluationDTO = { id: 1, name: "New Evaluation" } as EvaluationDTO;
//       mockEvaluationService.createEvaluation.mockResolvedValue(result);

//       expect(await controller.createEvaluation(createEvaluationDTO)).toBe(result);
//     });

//     it("should throw a 400 error if event name is not provided", async () => {
//       const createEvaluationDTO: SubmitEvaluationDTO = {
//         name: "",
//         tenantId: 0,
//         type: "",
//         location: "",
//       };

//       await expect(controller.createEvaluation(createEvaluationDTO)).rejects.toThrow(
//         new HttpException("Evaluation name is required", HttpStatus.BAD_REQUEST)
//       );
//     });
//   });
// });
