import { ApiProperty } from '@nestjs/swagger';
import { TicketDTO } from 'src/ticket/dto/ticket.dto';

export class EventDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tenantId: number; //adm do evento
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
  
  @ApiProperty()
  location: string;

  @ApiProperty()
  createdAt: Date;
}
