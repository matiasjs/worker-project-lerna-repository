import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { UserLoginInput, UserLoginOutput } from 'shared-workers';

export class LoginInputDto implements UserLoginInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto implements UserLoginOutput {
  @ApiProperty({ example: 'json.web.token' })
  accessToken: string;

  @ApiProperty({ example: 1234 })
  expire: number;
}
