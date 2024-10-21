import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tenantId: number;
}
