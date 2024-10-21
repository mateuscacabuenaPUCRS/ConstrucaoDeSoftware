import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserDTO } from "../dto/user.dto";
import { CreateUserDTO } from "../dto/create-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserDTO[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException('Failed to get users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<UserDTO> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException('Failed to get user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    try {
      if (!createUserDTO.name) {
        throw new HttpException('User name is required', HttpStatus.BAD_REQUEST);
      }
      return await this.userService.createUser(createUserDTO);
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(":id")
  async updateUser(@Param("id") id: number, @Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return await this.userService.updateUser(id, createUserDTO);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND || error.status === HttpStatus.BAD_REQUEST) {
        throw error;
      }
      throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: number): Promise<UserDTO> {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return await this.userService.deleteUser(id);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}