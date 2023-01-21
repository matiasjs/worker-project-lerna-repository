import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class WorkerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class WorkerResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uuid: string;
}
