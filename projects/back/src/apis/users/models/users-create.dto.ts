import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
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

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsNotEmpty()
  rank: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rolId: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  specializationsId: string[];

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
  @IsNumber()
  @IsNotEmpty()
  rank: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rolId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specializationsId: string[];

  @ApiProperty()
  @IsOptional()
  rol?: any;

  @ApiProperty()
  @IsOptional()
  specializations?: any[];

  @ApiProperty()
  @IsNotEmpty()
  address?: any;
}
