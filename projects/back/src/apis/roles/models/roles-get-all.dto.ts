import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { RolesGetAllOutput } from 'shared-workers';

class RolGetAllResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description;
}

export class RolesGetAllResponseDto
  extends Array<RolGetAllResponseDto>
  implements RolesGetAllOutput {}
