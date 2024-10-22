import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDTO {
  @ApiProperty()
  eventId: number;

  @ApiProperty()
  tenantId: number; // NOTE: sempre do comprador

  @ApiProperty()
  sellerId: number;

  @ApiProperty({
    description: "The price of the ticket in cents",
    default: 1000,
  })
  originalPrice: number;

  @ApiProperty({
    description: "The tickets verification code",
    default: 123456,
  })
  verificationCode: number;

  @ApiProperty({
    description: "The status of the ticket",
    default: "available",
  })
  status: string; // TODO: enum
}
