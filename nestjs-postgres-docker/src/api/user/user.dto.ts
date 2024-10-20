
// import { PostDTO } from '../post/post.dto';

export class UserDTO {
  // @ApiProperty()
  id: number;

  // @ApiProperty()
  email: string;

  // @ApiProperty()
  name: string;

  // @ApiProperty()
  // posts: PostDTO[];
}

export class CreateUserDTO {
  // @ApiProperty()
  email: string;

  // @ApiProperty()
  name: string;
}
