import { Test, TestingModule } from '@nestjs/testing';
import { TenantRepository } from '../../tenant/repository/tenant.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { EvaluationDTO } from '../dto/evaluation.dto';
import { SubmitEvaluationDTO } from '../dto/submit-evaluation.dto';
import { EvaluationRepository } from '../repository/evaluation.repository';
import { EvaluationService } from './evaluation.service';

describe('EvaluationService', () => {
  let service: EvaluationService;
  let evaluationRepository: EvaluationRepository;
  let userRepository: UserRepository;
  let tenantRepository: TenantRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationService,
        {
          provide: EvaluationRepository,
          useValue: {
            getAll: jest.fn(),
            add: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: TenantRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EvaluationService>(EvaluationService);
    evaluationRepository = module.get<EvaluationRepository>(EvaluationRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    tenantRepository = module.get<TenantRepository>(TenantRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all evaluations for a given seller', async () => {
      const sellerId = 1;
      const evaluations: EvaluationDTO[] = [
        { id: 1, rating: 5, comment: 'Great seller!', transactionId: 1, sellerId: 1, createdAt: new Date() },
      ];
      jest.spyOn(evaluationRepository, 'getAll').mockResolvedValue(evaluations);

      const result = await service.getAll(sellerId);
      expect(result).toEqual(evaluations);
    });
  });

  describe('submitEvaluation', () => {
    it('should throw an error if rating is not between 1 and 5', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = { rating: 6, comment: 'Good', transactionId: 1, sellerId: 1 };

      await expect(service.submitEvaluation(submitEvaluationDTO)).rejects.toThrow('Rating must be between 1 and 5');
    });

    it('should throw an error if seller is not found', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = { rating: 5, comment: 'Good', transactionId: 1, sellerId: 1 };
      jest.spyOn(userRepository, 'getById').mockResolvedValue(null);

      await expect(service.submitEvaluation(submitEvaluationDTO)).rejects.toThrow('Seller not found');
    });

    it('should throw an error if seller tenant is not found', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = { rating: 5, comment: 'Good', transactionId: 1, sellerId: 1 };
      jest.spyOn(userRepository, 'getById').mockResolvedValue({ id: 1, tenantId: 1, email: 'test@example.com', name: 'Test User', receiveNotifications: true });
      jest.spyOn(tenantRepository, 'getById').mockResolvedValue(null);

      await expect(service.submitEvaluation(submitEvaluationDTO)).rejects.toThrow('Seller tenant not found');
    });

    it('should throw an error if seller tenant is not really a seller', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = { rating: 5, comment: 'Good', transactionId: 1, sellerId: 1 };
      jest.spyOn(userRepository, 'getById').mockResolvedValue({ id: 1, tenantId: 1, email: 'test@example.com', name: 'Test User', receiveNotifications: true });
      jest.spyOn(tenantRepository, 'getById').mockResolvedValue({ id: 1, name: 'buyer', contactInformations: { email: '', phone: '' }, settings: { timezone: '', currency: '' } });
    
      await expect(service.submitEvaluation(submitEvaluationDTO)).rejects.toThrow('Seller tenant is not really a seller');
    });

    it('should add a new evaluation if all validations pass', async () => {
      const submitEvaluationDTO: SubmitEvaluationDTO = { rating: 5, comment: 'Good', transactionId: 1, sellerId: 1 };
      const evaluationDTO: EvaluationDTO = { id: 1, rating: 5, comment: 'Good', transactionId: 1, sellerId: 1, createdAt: new Date() };
      jest.spyOn(userRepository, 'getById').mockResolvedValue({ id: 1, tenantId: 1, email: 'test@example.com', name: 'Test User', receiveNotifications: true });
      jest.spyOn(tenantRepository, 'getById').mockResolvedValue({ 
        id: 1, 
        name: 'seller', 
        contactInformations: { email: '', phone: '' }, 
        settings: { timezone: '', currency: '' } 
      });
      jest.spyOn(evaluationRepository, 'add').mockResolvedValue(evaluationDTO);

      const result = await service.submitEvaluation(submitEvaluationDTO);
      expect(result).toEqual(evaluationDTO);
    });
  });
});