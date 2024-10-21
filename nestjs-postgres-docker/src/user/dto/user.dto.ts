import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: "Email of the user",
    default: "user@email.com" 
  })
  email: string;

  @ApiProperty({
    description: "Name of the user",
    default: "John Doe"
  })
  name: string;

  @ApiProperty({
    description: "Receive notifications",
    default: false
  })
  receiveNotifications: boolean;

  @ApiProperty()
  tenantId: number;
}
