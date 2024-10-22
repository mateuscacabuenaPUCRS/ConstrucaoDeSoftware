import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDTO {
  @ApiProperty({
    description: "The seller's (tentant) identification"
  })
  tenantId: number;

  @ApiProperty({
    description: "The buyer's (user) identification"
  })
  buyerId: number;

  @ApiProperty()
  ticketId: number;

  @ApiProperty({
    description: 'The price of the sale',
    default: 0
  })
  salesPrice: number;

  @ApiProperty({
    description: 'The status of the transaction',
    default: 'pending'
  })
  status: string;
}
