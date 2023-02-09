import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  Address,
  ProjectsCreateInput,
  ProjectsCreateOutput,
} from 'shared-workers';

export class ProjectsCreateResponseDto implements ProjectsCreateOutput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description;
}

export class ProjectsCreateRequestDto implements ProjectsCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: Address;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  workersIds?: string[];
}
