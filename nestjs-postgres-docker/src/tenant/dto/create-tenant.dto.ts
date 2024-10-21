import { ApiProperty } from "@nestjs/swagger";

export class CreateTenantDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  contactInformations: {
    email: string;
    phone: string;
  };

  @ApiProperty()
  settings: {
    timezone: string;
    currency: string;
  };
}
