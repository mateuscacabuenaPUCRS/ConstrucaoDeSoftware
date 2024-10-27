import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionRepository } from './transaction.repository';
import { TransactionEntity } from '../entity/transaction.entity';
import { CreateTransactionDTO } from '../dto/create-transaction.dto';
import { TransactionDTO } from '../dto/transaction.dto';

const mockTransactionEntity = {
    id: 1,
    salesPrice: 100,
    createdAt: new Date(),
    status: 'completed',
    buyerId: 1,
    ticketId: 1,
    tenantId: 1,
};

const mockTransactionRepository = {
    create: jest.fn().mockReturnValue(mockTransactionEntity),
    save: jest.fn().mockResolvedValue(mockTransactionEntity),
    find: jest.fn().mockResolvedValue([mockTransactionEntity]),
    findOne: jest.fn().mockResolvedValue(mockTransactionEntity),
    merge: jest.fn(),
};

describe('TransactionRepository', () => {
    let transactionRepository: TransactionRepository;
    let repository: Repository<TransactionEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionRepository,
                {
                    provide: getRepositoryToken(TransactionEntity),
                    useValue: mockTransactionRepository,
                },
            ],
        }).compile();

        transactionRepository = module.get<TransactionRepository>(TransactionRepository);
        repository = module.get<Repository<TransactionEntity>>(getRepositoryToken(TransactionEntity));
    });

    it('should be defined', () => {
        expect(transactionRepository).toBeDefined();
    });

    describe('add', () => {
        it('should add a new transaction', async () => {
            const createTransactionDTO: CreateTransactionDTO = {
                salesPrice: 100,
                status: 'completed',
                buyerId: 1,
                ticketId: 1,
                tenantId: 1,
            };

            const result = await transactionRepository.add(createTransactionDTO);
            expect(result).toEqual(mockTransactionEntity);
            expect(repository.create).toHaveBeenCalledWith(createTransactionDTO);
            expect(repository.save).toHaveBeenCalledWith(mockTransactionEntity);
        });
    });

    describe('getAll', () => {
        it('should return all transactions', async () => {
            const result = await transactionRepository.getAll();
            expect(result).toEqual([mockTransactionEntity]);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('getById', () => {
        it('should return a transaction by id', async () => {
            const result = await transactionRepository.getById(1);
            expect(result).toEqual(mockTransactionEntity);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('update', () => {
        it('should update a transaction', async () => {
            const updatedTransaction: Partial<TransactionDTO> = { salesPrice: 200 };
            const result = await transactionRepository.update(1, updatedTransaction);
            expect(result).toEqual(mockTransactionEntity);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(repository.merge).toHaveBeenCalledWith(mockTransactionEntity, updatedTransaction);
            expect(repository.save).toHaveBeenCalledWith(mockTransactionEntity);
        });
    });
});