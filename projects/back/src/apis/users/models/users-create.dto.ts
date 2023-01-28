import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserCreateInput, UserCreateOutput } from 'shared-workers';

export class UserCreateInputDto implements UserCreateInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rolid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specializationid: string;
}

export class UserCreateResponseDto implements UserCreateOutput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rolid: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specializationid: string;

  @ApiProperty()
  @IsOptional()
  rol?: any;

  @ApiProperty()
  @IsOptional()
  specialization?: any;
}
