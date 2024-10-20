import { ApiProperty } from '@nestjs/swagger';

export class EventDTO {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
  
  @ApiProperty()
  location: string;

  @ApiProperty()
  date: string; //TODO: type
}
