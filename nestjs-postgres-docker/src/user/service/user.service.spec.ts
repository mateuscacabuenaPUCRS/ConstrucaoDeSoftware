import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDTO } from '../dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

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
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    const result: UserDTO[] = [];
    jest.spyOn(userRepository, 'getAll').mockResolvedValue(result);

    expect(await service.getAllUsers()).toBe(result);
  });

  it('should get user by id', async () => {
    const result: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'getById').mockResolvedValue(result);

    expect(await service.getUserById(1)).toBe(result);
  });

  it('should create a user', async () => {
    const createUserDTO: CreateUserDTO = new CreateUserDTO();
    const result: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'add').mockResolvedValue(result);

    expect(await service.createUser(createUserDTO)).toBe(result);
  });

  it('should update a user', async () => {
    const createUserDTO: CreateUserDTO = new CreateUserDTO();
    const result: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'update').mockResolvedValue(result);

    expect(await service.updateUser(1, createUserDTO)).toBe(result);
  });

  it('should delete a user', async () => {
    const result: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'delete').mockResolvedValue(result);

    expect(await service.deleteUser(1)).toBe(result);
  });

  it('should login a user', async () => {
    const result: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'login').mockResolvedValue(result);

    expect(await service.login('test@example.com')).toBe(result);
  });

  it('should toggle notifications for a user', async () => {
    const result: UserDTO = new UserDTO();
    jest.spyOn(userRepository, 'toggleNotifications').mockResolvedValue(result);

    expect(await service.toggleNotifications(1)).toBe(result);
  });
});