import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '@shared/guards/jwt.auth.guard';
import { UsersService } from './users.service';
import {
  UserCreateInputDto,
  UserCreateResponseDto,
} from './models/users-create.dto';
import { UserGetByEmailInput, UserGetByEmailOutput } from 'shared-workers';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ description: 'Create user' })
  @ApiCreatedResponse({ type: UserCreateResponseDto })
  @Post('')
  @UseGuards(JwtAuthGuard)
  async login(
    @Body() user: UserCreateInputDto,
  ): Promise<UserCreateResponseDto> {
    return this.userService.create(user);
  }

  @ApiOperation({ description: 'Get user by email' })
  @ApiCreatedResponse({ type: UserCreateResponseDto })
  @Get(':email')
  @UseGuards(JwtAuthGuard)
  async getUSerByEmail(
    @Param() params: UserGetByEmailInput,
  ): Promise<UserGetByEmailOutput> {
    return this.userService.getUSerByEmail(params.email);
  }
}
