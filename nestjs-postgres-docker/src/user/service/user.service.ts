import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { UserRepository } from "../repository/user.repository";

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

  async updateUser(id: number, createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.userRepository.update(id, createUserDTO);
  }

  async deleteUser(id: number): Promise<UserDTO> {
    return this.userRepository.delete(id);
  }

  async login(email: string): Promise<UserDTO> {
    return this.userRepository.login(email);
  }

  async toggleNotifications(id: number): Promise<UserDTO> {
    return this.userRepository.toggleNotifications(id);
  }
}
