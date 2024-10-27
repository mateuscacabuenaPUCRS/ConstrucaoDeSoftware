import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionEntity } from "../../transaction/entity/transaction.entity";
import { UserEntity } from "../../user/entity/user.entity";
import { SubmitEvaluationDTO } from "../dto/submit-evaluation.dto";
import { EvaluationEntity } from "../entity/evaluation.entity";
import { EvaluationRepository } from "./evaluation.repository";

describe("EvaluationRepository", () => {
  let evaluationRepository: EvaluationRepository;
  let repository: Repository<EvaluationEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationRepository,
        {
          provide: getRepositoryToken(EvaluationEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    evaluationRepository = module.get<EvaluationRepository>(EvaluationRepository);
    repository = module.get<Repository<EvaluationEntity>>(
      getRepositoryToken(EvaluationEntity)
    );
  });

  it("should be defined", () => {
    expect(evaluationRepository).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array of evaluations", async () => {
      const evaluationEntities: EvaluationEntity[] = [
        {
          id: 1,
          rating: 5,
          comment: "Comment 1",
          createdAt: new Date(),
          transactionId: 1,
          transaction: new TransactionEntity(),
          sellerId: 1,
          seller: new UserEntity(),
        },
        {
          id: 2,
          rating: 4,
          comment: "Comment 2",
          createdAt: new Date(),
          transactionId: 2,
          transaction: new TransactionEntity(),
          sellerId: 2,
          seller: new UserEntity(),
        },
        {
          id: 3,
          rating: 3,
          comment: "Comment 3",
          createdAt: new Date(),
          transactionId: 3,
          transaction: new TransactionEntity(),
          sellerId: 1,
          seller: new UserEntity(),
        }
      ];
      jest.spyOn(repository, "find").mockResolvedValue(evaluationEntities);

      const sellerId = 1;
      const result = await evaluationRepository.getAll(sellerId);
      const evaluationEntitiesDTO = evaluationEntities.map(({ id, rating, comment, createdAt, transactionId, sellerId }) => ({
        id,
        rating,
        comment,
        createdAt,
        transactionId,
        sellerId,
      }));
      expect(result).toEqual(
        evaluationEntitiesDTO
      );
    });
  });

  describe("add", () => {
    it("should add a new evaluation", async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = {
        rating: 5,
        comment: "Great seller!",
        transactionId: 1,
        sellerId: 1,
      };
      const evaluationEntity: EvaluationEntity = {
        id: 1,
        ...submitEvaluationDTO,
        createdAt: new Date(),
        transaction: new TransactionEntity(),
        seller: new UserEntity(),
      };
      jest.spyOn(repository, "create").mockReturnValue(evaluationEntity);
      jest.spyOn(repository, "save").mockResolvedValue(evaluationEntity);

      const result = await evaluationRepository.add(submitEvaluationDTO);
      expect(result).toEqual({
        id: evaluationEntity.id,
        rating: submitEvaluationDTO.rating,
        comment: submitEvaluationDTO.comment,
        createdAt: evaluationEntity.createdAt,
        transactionId: submitEvaluationDTO.transactionId,
        sellerId: submitEvaluationDTO.sellerId,
      });
    });
  });
});
