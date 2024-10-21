import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tenantId: number;
}
