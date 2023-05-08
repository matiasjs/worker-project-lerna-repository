import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  Address,
  ProjectsCreateInput,
  ProjectsCreateOutput,
  ProjectsCreateWorkersOutput,
} from 'shared-workers';

export class ProjectsCreateResponseDto implements ProjectsCreateOutput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: number;
    zip_code: string;
    floor: string;
    tower: string;
    department: string;
    coordinates: {
      lat: string;
      long: string;
    };
  };

  @ApiProperty()
  @IsObject({ each: true })
  @IsOptional()
  workers: ProjectsCreateWorkersOutput[];

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

  @ApiProperty({ default: [] })
  @IsObject({ each: true })
  @IsNotEmpty()
  workers?: any[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  ownerId: string;
}
