import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entity/user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  // Método auxiliar para converter a entidade para UserDTO
  private toUserDTO({ id, email, name, receiveNotifications, tenantId }: UserEntity): UserDTO {
    return { id, email, name, receiveNotifications, tenantId };
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

  // Método para atualizar um usuário
  async update(id: number, createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } }); // Busca o usuário pelo ID
    this.userRepository.merge(user, createUserDTO); // Atualiza os dados do usuário
    await this.userRepository.save(user); // Salva no banco de dados
    return this.toUserDTO(user); // Retorna o usuário atualizado como DTO
  }

  // Método para deletar um usuário
  async delete(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.remove(user);
    return this.toUserDTO(user);
  }

  // Método para realizar login
  async login(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { email } });

    return this.toUserDTO(user); // TODO: quando não há user, retorna null e não consegue converter para DTO
  }

  async toggleNotifications(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    user.receiveNotifications = !user.receiveNotifications;
    await this.userRepository.save(user);
    return this.toUserDTO(user);
  }
}
