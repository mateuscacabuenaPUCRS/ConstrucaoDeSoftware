import { ApiProperty } from '@nestjs/swagger';

export class SubmitEvaluationDTO {
  @ApiProperty({
    description: 'Rating of the seller',
    default: 5,
    minimum: 1,
    maximum: 5,
  })
  rating: number;

  @ApiProperty({
    description: 'Comment about the seller',
    default: 'Great seller!',
  })
  comment: string;
  
  @ApiProperty({
    description: 'Id of the transaction which was evaluated',
    default: 1,
  })
  transactionId: number;

  @ApiProperty({
    description: 'Id of the seller which was evaluated',
    default: 1,
  })
  sellerId: number;
}
