import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
  
  @ApiProperty()
  location: string;

  @ApiProperty()
  date: string; //TODO: type
}
