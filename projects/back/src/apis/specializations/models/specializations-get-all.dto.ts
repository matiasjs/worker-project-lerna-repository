import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { SpecializationsGetAllOutput } from 'shared-workers';

class SpecializationGetAllResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description;
}

export class SpecializationsGetAllResponseDto
  extends Array<SpecializationGetAllResponseDto>
  implements SpecializationsGetAllOutput {}
