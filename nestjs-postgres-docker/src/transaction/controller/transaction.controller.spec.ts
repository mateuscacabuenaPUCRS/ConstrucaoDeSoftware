import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from '../service/transaction.service';
import { TransactionDTO } from '../dto/transaction.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TransactionController', () => {
    let controller: TransactionController;
    let service: TransactionService;

    const mockTransactionService = {
        createTransaction: jest.fn(),
        getTransactions: jest.fn(),
        getTransaction: jest.fn(),
        updateTransaction: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [
                {
                    provide: TransactionService,
                    useValue: mockTransactionService,
                },
            ],
        }).compile();

        controller = module.get<TransactionController>(TransactionController);
        service = module.get<TransactionService>(TransactionService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createTransaction', () => {
        it('should create a transaction', async () => {
            const result: TransactionDTO = {
                id: 1, buyerId: 1, ticketId: 1, status: 'pending',
                tenantId: 0,
                salesPrice: 0,
                createdAt: undefined
            };
            mockTransactionService.createTransaction.mockResolvedValue(result);

            expect(await controller.createTransaction(1, 1)).toBe(result);
        });

        it('should throw an error if buyerId or ticketId is missing', async () => {
            await expect(controller.createTransaction(null, 1)).rejects.toThrow(HttpException);
            await expect(controller.createTransaction(1, null)).rejects.toThrow(HttpException);
        });

        it('should handle service errors', async () => {
            mockTransactionService.createTransaction.mockRejectedValue(new Error('Service error'));

            await expect(controller.createTransaction(1, 1)).rejects.toThrow(HttpException);
        });
    });

    describe('getTransactions', () => {
        it('should return an array of transactions', async () => {
            const result: TransactionDTO[] = [{
                id: 1, buyerId: 1, ticketId: 1, status: 'pending',
                tenantId: 0,
                salesPrice: 0,
                createdAt: undefined
            }];
            mockTransactionService.getTransactions.mockResolvedValue(result);

            expect(await controller.getTransactions()).toBe(result);
        });

        it('should handle service errors', async () => {
            mockTransactionService.getTransactions.mockRejectedValue(new Error('Service error'));

            await expect(controller.getTransactions()).rejects.toThrow(HttpException);
        });
    });

    describe('getTransaction', () => {
        it('should return a transaction', async () => {
            const result: TransactionDTO = {
                id: 1, buyerId: 1, ticketId: 1, status: 'pending',
                tenantId: 0,
                salesPrice: 0,
                createdAt: undefined
            };
            mockTransactionService.getTransaction.mockResolvedValue(result);

            expect(await controller.getTransaction(1)).toBe(result);
        });

        it('should throw an error if transaction is not found', async () => {
            mockTransactionService.getTransaction.mockResolvedValue(null);

            await expect(controller.getTransaction(1)).rejects.toThrow(HttpException);
        });

        it('should handle service errors', async () => {
            mockTransactionService.getTransaction.mockRejectedValue(new Error('Service error'));

            await expect(controller.getTransaction(1)).rejects.toThrow(HttpException);
        });
    });

    describe('validateTransaction', () => {
        it('should validate a transaction', async () => {
            const result: TransactionDTO = {
                id: 1, buyerId: 1, ticketId: 1, status: 'approved',
                tenantId: 0,
                salesPrice: 0,
                createdAt: undefined
            };
            mockTransactionService.getTransaction.mockResolvedValue(result);
            mockTransactionService.updateTransaction.mockResolvedValue(result);

            expect(await controller.validateTransaction(1)).toBe(result);
        });

        it('should throw an error if transaction is not found', async () => {
            mockTransactionService.getTransaction.mockResolvedValue(null);

            await expect(controller.validateTransaction(1)).rejects.toThrow(HttpException);
        });

        it('should handle service errors', async () => {
            mockTransactionService.getTransaction.mockRejectedValue(new Error('Service error'));

            await expect(controller.validateTransaction(1)).rejects.toThrow(HttpException);
        });
    });

    describe('cancelTransaction', () => {
        it('should cancel a transaction', async () => {
            const result: TransactionDTO = {
                id: 1, buyerId: 1, ticketId: 1, status: 'canceled',
                tenantId: 0,
                salesPrice: 0,
                createdAt: undefined
            };
            mockTransactionService.getTransaction.mockResolvedValue(result);
            mockTransactionService.updateTransaction.mockResolvedValue(result);

            expect(await controller.cancelTransaction(1)).toBe(result);
        });

        it('should throw an error if transaction is not found', async () => {
            mockTransactionService.getTransaction.mockResolvedValue(null);

            await expect(controller.cancelTransaction(1)).rejects.toThrow(HttpException);
        });

        it('should handle service errors', async () => {
            mockTransactionService.getTransaction.mockRejectedValue(new Error('Service error'));

            await expect(controller.cancelTransaction(1)).rejects.toThrow(HttpException);
        });
    });
});