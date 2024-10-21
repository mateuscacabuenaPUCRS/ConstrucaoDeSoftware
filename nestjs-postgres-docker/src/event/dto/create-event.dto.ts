import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty()
  tenantId: number; //adm do evento
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string; //TODO: 
  
  @ApiProperty()
  location: string;

  @ApiProperty()
  createdAt: Date;
}
