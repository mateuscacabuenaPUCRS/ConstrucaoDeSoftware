import { ApiProperty } from "@nestjs/swagger";

export class TenantDTO {
  @ApiProperty()
  id: number;

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
