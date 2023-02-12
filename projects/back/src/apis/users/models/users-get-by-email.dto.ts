import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
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
  rolid: string;

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
}
