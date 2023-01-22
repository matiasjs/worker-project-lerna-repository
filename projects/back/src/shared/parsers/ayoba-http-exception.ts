import { ApiProperty } from '@nestjs/swagger';

export class AyobaHttpException {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  message: string;

  [key: string]: any;
}
