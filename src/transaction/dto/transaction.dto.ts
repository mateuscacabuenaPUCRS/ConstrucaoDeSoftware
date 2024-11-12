import { ApiProperty } from "@nestjs/swagger";

export class TransactionDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tenantId: number;

  @ApiProperty()
  buyerId: number;

  @ApiProperty()
  ticketId: number;

  @ApiProperty({
    description: "The price of the ticket at the time of the transaction",
    default: 0,
  })
  salesPrice: number;

  @ApiProperty({
    description: "The date and time of the transaction",
    default: new Date().toISOString(),
  })
  createdAt: Date;

  @ApiProperty({
    description: "The status of the transaction",
    default: "pending",
    // enum: ["pending", "approved", "canceled"]
  })
  status: string;
}
