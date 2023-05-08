import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserGetByEmailInput, UserGetByEmailOutput } from 'shared-workers';

export class UserGetByEmailInputDto implements UserGetByEmailInput {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UserGetByEmailResponseDto implements UserGetByEmailOutput {
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
