// import { Test, TestingModule } from '@nestjs/testing';
// import { EvaluationService } from './evaluation.service';
// import { EvaluationDTO } from '../dto/evaluation.dto';
// import { SubmitEvaluationDTO } from '../dto/submit-evaluation.dto';
// import { EvaluationRepository } from '../repository/evaluation.repository';
// import { UserRepository } from '../../user/repository/user.repository';
// import { TenantRepository } from '../../tenant/repository/tenant.repository';

// describe('EvaluationService', () => {
//     let service: EvaluationService;
//     let evaluationRepository: EvaluationRepository;
//     let userRepository: UserRepository;
//     let tenantRepository: TenantRepository;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 EvaluationService,
//                 {
//                     provide: EvaluationRepository,
//                     useValue: {
//                         getAll: jest.fn(),
//                         submitEvaluation: jest.fn(),
//                     },
//                 },
//                 {
//                     provide: UserRepository,
//                     useValue: {
//                         getById: jest.fn(),
//                     },
//                 },
//                 {
//                     provide: TenantRepository,
//                     useValue: {
//                         getById: jest.fn(),
//                     },
//                 },
//             ],
//         }).compile();

//         service = module.get<EvaluationService>(EvaluationService);
//         evaluationRepository = module.get<EvaluationRepository>(EvaluationRepository);
//         userRepository = module.get<UserRepository>(UserRepository);
//         tenantRepository = module.get<TenantRepository>(TenantRepository);
//     });

//     it('should be defined', () => {
//         expect(service).toBeDefined();
//     });

//     it('should get all evaluations from a seller', async () => {
//         const result: EvaluationDTO[] = [];
//         jest.spyOn(evaluationRepository, 'getAll').mockResolvedValue(result);
//         expect(await service.getAll(1)).toBe(result);
//     });


//     it('should submit an evaluation', async () => {
//         const submitEvaluationDTO: SubmitEvaluationDTO = new SubmitEvaluationDTO();
//         const result: EvaluationDTO = new EvaluationDTO();
//         jest.spyOn(evaluationRepository, 'add').mockResolvedValue(result);
//         jest.spyOn(userRepository, 'getById').mockResolvedValue({ tenantId: 1 });
//         jest.spyOn(tenantRepository, 'getById').mockResolvedValue({ name: 'admin' });
//         expect(await service.submitEvaluation(submitEvaluationDTO)).toBe(result);
//     });
// });
