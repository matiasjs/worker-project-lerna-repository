import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ProjectsCreateInput, ProjectsCreateOutput } from 'shared-workers';

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
}
