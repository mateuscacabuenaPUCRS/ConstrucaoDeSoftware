import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { UserDTO } from "../dto/user.dto";
import { CreateUserDTO } from "../dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  // Método auxiliar para converter a entidade para UserDTO
  private toUserDTO(user: UserEntity): UserDTO {
    const { id, email, name } = user;
    return { id, email, name };
  }

  // Método para buscar todos os usuários
  async getAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toUserDTO(user));
  }

  // Método para buscar um usuário pelo ID
  async getById(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.toUserDTO(user);
  }

  // Método para adicionar um novo usuário
  async add(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const user = this.userRepository.create(createUserDTO); // Cria a entidade
    await this.userRepository.save(user); // Salva no banco de dados
    return this.toUserDTO(user); // Retorna o usuário salvo como DTO
  }

  // Método para deletar um usuário
  async delete(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.remove(user);
    return this.toUserDTO(user);
  }
}
