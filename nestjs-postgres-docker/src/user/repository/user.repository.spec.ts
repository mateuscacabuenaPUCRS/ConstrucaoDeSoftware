import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from './user.repository';

const mockUserEntity = {
  id: 1,
  email: 'test@example.com',
  name: 'Test User',
  receiveNotifications: true,
  tenantId: 'tenant1',
};

const mockUserRepository = {
  find: jest.fn().mockResolvedValue([mockUserEntity]),
  findOne: jest.fn().mockResolvedValue(mockUserEntity),
  create: jest.fn().mockReturnValue(mockUserEntity),
  save: jest.fn().mockResolvedValue(mockUserEntity),
  remove: jest.fn().mockResolvedValue(mockUserEntity),
  merge: jest.fn(),
};

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await userRepository.getAll();
      expect(result).toEqual([mockUserEntity]);
    });
  });

  describe('getById', () => {
    it('should return a user by id', async () => {
      const result = await userRepository.getById(1);
      expect(result).toEqual(mockUserEntity);
    });
  });

  describe('add', () => {
    it('should add a new user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'test@example.com',
        name: 'Test User',
        receiveNotifications: true,
        tenantId: 1,
      };
      const result = await userRepository.add(createUserDTO);
      expect(result).toEqual(mockUserEntity);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const createUserDTO: CreateUserDTO = {
        email: 'updated@example.com',
        name: 'Updated User',
        receiveNotifications: false,
        tenantId: 1,
      };
      const result = await userRepository.update(1, createUserDTO);
      expect(result).toEqual(mockUserEntity);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = await userRepository.delete(1);
      expect(result).toEqual(mockUserEntity);
    });
  });

  describe('login', () => {
    it('should return a user by email', async () => {
      const result = await userRepository.login('test@example.com');
      expect(result).toEqual(mockUserEntity);
    });
  });

  describe('toggleNotifications', () => {
    it('should toggle notifications for a user', async () => {
      const initialReceiveNotifications = mockUserEntity.receiveNotifications;
      mockUserEntity.receiveNotifications = !initialReceiveNotifications;
      const result = await userRepository.toggleNotifications(1);
      expect(result.receiveNotifications).toBe(initialReceiveNotifications);
    });
  });
});