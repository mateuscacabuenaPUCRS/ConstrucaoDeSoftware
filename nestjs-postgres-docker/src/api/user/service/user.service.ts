import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO, UserDTO } from '../user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserDTO[]> {
    return this.userRepository.getAll();
  }

  async getUserById(id: number): Promise<UserDTO> {
    return this.userRepository.getById(id);
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.userRepository.add(createUserDTO);
  }

  async deleteUser(id: number): Promise<UserDTO> {
    return this.userRepository.delete(id);
  }
}
