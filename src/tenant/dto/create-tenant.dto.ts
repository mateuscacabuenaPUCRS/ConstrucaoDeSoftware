import { ApiProperty } from "@nestjs/swagger";

export class CreateTenantDTO {
  @ApiProperty({
    description: "Tenant name",
    default: "My Company",
  })
  name: string;

  @ApiProperty({
    description: 'Tenant contact information',
    default: {
      email: 'tenant@email.com',
      phone: '+1234567890',
    },
  })
  contactInformations: {
    email: string;
    phone: string;
  };

  @ApiProperty({
    description: 'Tenant settings',
    default: {
      timezone: 'UTC',
      currency: 'USD',
    },
  })
  settings: {
    timezone: string;
    currency: string;
  };
}
