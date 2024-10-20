import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
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
