import { ApiProperty } from '@nestjs/swagger';

export class EventDTO {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  date: string;
  
  @ApiProperty()
  location: string;
  
  @ApiProperty()
  price: number;
  
  @ApiProperty()
  description: string;
}
