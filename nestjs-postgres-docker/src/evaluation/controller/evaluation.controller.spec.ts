import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EvaluationDTO } from '../dto/evaluation.dto';
import { SubmitEvaluationDTO } from '../dto/submit-evaluation.dto';
import { EvaluationService } from '../service/evaluation.service';
import { EvaluationController } from './evaluation.controller';

describe('EvaluationController', () => {
  let controller: EvaluationController;
  let service: EvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController],
      providers: [
        {
          provide: EvaluationService,
          useValue: {
            getAll: jest.fn(),
            submitEvaluation: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EvaluationController>(EvaluationController);
    service = module.get<EvaluationService>(EvaluationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of evaluations', async () => {
      const result: EvaluationDTO[] = [
        {
          id: 1,
          rating: 5,
          comment: 'Great seller!',
          transactionId: 1,
          sellerId: 1,
          createdAt: new Date(),
        },
      ];
      jest.spyOn(service, 'getAll').mockResolvedValue(result);

      expect(await controller.getAll(1)).toBe(result);
    });

    it('should throw an exception if service fails', async () => {
      jest.spyOn(service, 'getAll').mockRejectedValue(new Error('Service error'));

      await expect(controller.getAll(1)).rejects.toThrow(HttpException);
    });
  });

  describe('submitEvaluation', () => {
    it('should return the created evaluation', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = {
        rating: 5,
        comment: 'Great seller!',
        transactionId: 1,
        sellerId: 1,
      };
      const result: EvaluationDTO = {
        id: 1,
        rating: 5,
        comment: 'Great seller!',
        transactionId: 1,
        sellerId: 1,
        createdAt: new Date(),
      };
      jest.spyOn(service, 'submitEvaluation').mockResolvedValue(result);

      expect(await controller.submitEvaluation(submitEvaluationDTO)).toBe(result);
    });

    it('should throw a BAD_REQUEST exception if transactionId or sellerId is missing', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = {
        rating: 5,
        comment: 'Great seller!',
        transactionId: null,
        sellerId: null,
      };

      await expect(controller.submitEvaluation(submitEvaluationDTO)).rejects.toThrow(HttpException);
    });

    it('should throw an exception if service fails', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = {
        rating: 5,
        comment: 'Great seller!',
        transactionId: 1,
        sellerId: 1,
      };
      jest.spyOn(service, 'submitEvaluation').mockRejectedValue(new Error('Service error'));

      await expect(controller.submitEvaluation(submitEvaluationDTO)).rejects.toThrow(HttpException);
    });
  });
});