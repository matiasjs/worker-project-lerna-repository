import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import {
  ProjectsGetManyOutput,
  ProjectsGetManyWorkersOutput,
} from 'shared-workers';

export class ProjectsGetManyResponseDto implements ProjectsGetManyOutput {
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
    number: string;
    zip_code: string;
    floor: string;
    tower: string;
    department: string;
  };

  @ApiProperty()
  @IsObject({ each: true })
  @IsOptional()
  workers: ProjectsGetManyWorkersOutput[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description;
}
