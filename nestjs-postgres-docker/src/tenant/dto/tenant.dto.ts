import { ApiProperty } from "@nestjs/swagger";

export class TenantDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'Tenant name',
    default: 'Acme Inc'
  })
  name: string;

  @ApiProperty({
    description: 'Tenant contact informations',
    default: {
      email: 'tenant@email.com',
      phone: '+1234567890'
    }
  })
  contactInformations: {
    email: string;
    phone: string;
  };

  @ApiProperty({
    description: 'Tenant settings',
    default: {
      timezone: 'UTC',
      currency: 'USD'
    }
  })
  settings: {
    timezone: string;
    currency: string;
  };
}
