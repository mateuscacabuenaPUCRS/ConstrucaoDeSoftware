import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { PostDTO } from '../post/post.dto';

export class UserDTO implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    posts: PostDTO[];
}

export class CreateUserDTO {
    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;
}
