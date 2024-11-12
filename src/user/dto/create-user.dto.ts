import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({
    description: "The email of the user",
    default: "user@email.com",
  })
  email: string;

  @ApiProperty({
    description: "The name of the user",
    default: "John Doe",
  })
  name: string;

  @ApiProperty({
    description: "Receive notifications",
    default: false,
  })
  receiveNotifications: boolean;

  @ApiProperty()
  tenantId: number;
}
