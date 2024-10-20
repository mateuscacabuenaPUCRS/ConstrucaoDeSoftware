import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserDTO } from "../dto/user.dto";
import { CreateUserDTO } from "../dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<UserDTO> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.userService.createUser(createUserDTO);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<UserDTO> {
    return this.userService.deleteUser(id);
  }
}
