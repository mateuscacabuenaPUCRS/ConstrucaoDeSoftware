import { ApiProperty } from "@nestjs/swagger";

export class TicketDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  eventId: number;

  @ApiProperty({
    description: "The buyer's (tenant) identification",
  })
  tenantId: number;

  @ApiProperty()
  sellerId: number;

  @ApiProperty({
    description: "The tickets original price",
    default: 0.0,
  })
  originalPrice: number;

  @ApiProperty({
    description: "The tickets verification code",
    default: 0,
  })
  verificationCode: number;

  @ApiProperty({
    description: "The tickets status",
    default: "available",
  })
  status: string; // TODO: enum (available, sold, used,)
}
