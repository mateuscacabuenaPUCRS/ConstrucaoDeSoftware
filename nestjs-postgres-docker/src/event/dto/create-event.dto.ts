import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty({
    description: 'The tenant id of the event',
  })
  tenantId: number; //adm do evento
  
  @ApiProperty({
    description: 'The name of the event',
    default: 'NestJS Event',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the event',
    default: 'This is a NestJS event',
  })
  type: string; //TODO: 
  
  @ApiProperty({
    description: 'Where the event will take place',
    default: "São Paulo, Brazil",
  })
  location: string;
}
