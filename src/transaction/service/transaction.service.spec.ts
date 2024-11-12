import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from '../repository/transaction.repository';
import { UserRepository } from '../../user/repository/user.repository';
import { TicketRepository } from '../../ticket/repository/ticket.repository';
import { TransactionDTO } from '../dto/transaction.dto';

describe('TransactionService', () => {
    let service: TransactionService;
    let transactionRepository: TransactionRepository;
    let userRepository: UserRepository;
    let ticketRepository: TicketRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
                {
                    provide: TransactionRepository,
                    useValue: {
                        add: jest.fn(),
                        getAll: jest.fn(),
                        getById: jest.fn(),
                        update: jest.fn(),
                    },
                },
                {
                    provide: UserRepository,
                    useValue: {},
                },
                {
                    provide: TicketRepository,
                    useValue: {
                        getById: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<TransactionService>(TransactionService);
        transactionRepository = module.get<TransactionRepository>(TransactionRepository);
        userRepository = module.get<UserRepository>(UserRepository);
        ticketRepository = module.get<TicketRepository>(TicketRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getTransactions', () => {
        it('should return an array of transactions', async () => {
            const transactions = [{ id: 1 }, { id: 2 }] as TransactionDTO[];

            jest.spyOn(transactionRepository, 'getAll').mockResolvedValue(transactions);

            const result = await service.getTransactions();

            expect(result).toEqual(transactions);
            expect(transactionRepository.getAll).toHaveBeenCalled();
        });
    });

    describe('getTransaction', () => {
        it('should return a single transaction', async () => {
            const transaction = { id: 1 } as TransactionDTO;

            jest.spyOn(transactionRepository, 'getById').mockResolvedValue(transaction);

            const result = await service.getTransaction(1);

            expect(result).toEqual(transaction);
            expect(transactionRepository.getById).toHaveBeenCalledWith(1);
        });
    });

    describe('updateTransaction', () => {
        it('should update a transaction', async () => {
            const updatedTransaction = { status: 'completed' } as Partial<TransactionDTO>;
            const transaction = { id: 1, status: 'completed' } as TransactionDTO;

            jest.spyOn(transactionRepository, 'update').mockResolvedValue(transaction);

            const result = await service.updateTransaction(1, updatedTransaction);

            expect(result).toEqual(transaction);
            expect(transactionRepository.update).toHaveBeenCalledWith(1, updatedTransaction);
        });
    });
});