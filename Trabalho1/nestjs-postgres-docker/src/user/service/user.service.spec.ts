import { Test, TestingModule } from '@nestjs/testing';
import { TicketDTO } from '../../ticket/dto/ticket.dto';
import { TicketRepository } from '../../ticket/repository/ticket.repository';
import { TransactionRepository } from '../../transaction/repository/transaction.repository';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDTO } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let transactionRepository: TransactionRepository;
  let ticketRepository: TicketRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            add: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            login: jest.fn(),
            toggleNotifications: jest.fn(),
          },
        },
        {
          provide: TransactionRepository,
          useValue: {
            getBuyerTransactions: jest.fn(),
          },
        },
        {
          provide: TicketRepository,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
    ticketRepository = module.get<TicketRepository>(TicketRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    const expectedUsers: UserDTO[] = [];
    jest.spyOn(userRepository, 'getAll').mockResolvedValue(expectedUsers);

    const users = await service.getAllUsers();
    expect(users).toEqual(expectedUsers);
  });

  it('should get user by id', async () => {
    const expectedUser: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'getById').mockResolvedValue(expectedUser);

    const user = await service.getUserById(1);
    expect(user).toEqual(expectedUser);
  });

  it('should create a user', async () => {
    const createUserDTO: CreateUserDTO = new CreateUserDTO();
    const expectedUser: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'add').mockResolvedValue(expectedUser);

    const user = await service.createUser(createUserDTO);
    expect(user).toEqual(expectedUser);
  });

  it('should update a user', async () => {
    const createUserDTO: CreateUserDTO = new CreateUserDTO();
    const expectedUser: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'update').mockResolvedValue(expectedUser);

    const user = await service.updateUser(1, createUserDTO);
    expect(user).toEqual(expectedUser);
  });

  it('should delete a user', async () => {
    const expectedUser: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'delete').mockResolvedValue(expectedUser);

    const user = await service.deleteUser(1);
    expect(user).toEqual(expectedUser);
  });

  it('should login a user', async () => {
    const expectedUser: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'login').mockResolvedValue(expectedUser);

    const user = await service.login('test@example.com');
    expect(user).toEqual(expectedUser);
  });

  it('should toggle notifications for a user', async () => {
    const expectedUser: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'toggleNotifications').mockResolvedValue(expectedUser);

    const user = await service.toggleNotifications(1);
    expect(user).toEqual(expectedUser);
  });

  it('should get purchased tickets for a user', async () => {
    const expectedTickets: TicketDTO[] = [new TicketDTO()];
    const transactions = [{ id: 1, tenantId: 1, buyerId: 1, salesPrice: 100, ticketId: 1, createdAt: new Date(), status: 'completed' }];
    jest.spyOn(transactionRepository, 'getBuyerTransactions').mockResolvedValue(transactions);
    jest.spyOn(ticketRepository, 'getById').mockResolvedValue(new TicketDTO());

    const tickets = await service.getPurchasedTickets(1);
    expect(tickets).toEqual(expectedTickets);
  });
});