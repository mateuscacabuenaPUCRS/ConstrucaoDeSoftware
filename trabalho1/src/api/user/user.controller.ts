import {
	Controller,
	Post,
	Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';

import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	
	@Post()
	async signupUser(
		@Body() userData: CreateUserDTO,
	): Promise<UserModel> {
		return this.userService.createUser(userData);
	}
}
