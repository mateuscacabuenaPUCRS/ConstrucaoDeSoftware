import { ApiProperty } from '@nestjs/swagger';

export class EventDTO {
  @ApiProperty({})
  id: number;

  @ApiProperty()
  tenantId: number; //adm do evento
  
  @ApiProperty({
    description: 'Name of the event',
    default: 'NestJS Event',
  })
  name: string;

  @ApiProperty({
    description: 'Type of the event',
    default: 'NestJS Type',
  })
  type: string;
  
  @ApiProperty({
    description: 'Location of the event',
    default: 'São Paulo',
  })
  location: string;

  @ApiProperty({
    description: 'Date of the event',
    default: '2021-01-01',
  })
  createdAt: Date;
}
