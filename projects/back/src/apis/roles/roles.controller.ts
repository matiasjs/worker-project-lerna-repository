import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '@shared/guards/jwt.auth.guard';
import { RolesService } from './roles.service';

import { RolesGetAllResponseDto } from './models/roles-get-all.dto';

@ApiTags('Roles')
@Controller('v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ description: 'Get user by email' })
  @ApiCreatedResponse({ type: RolesGetAllResponseDto })
  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUSerByEmail(): Promise<RolesGetAllResponseDto> {
    return this.rolesService.getAll();
  }
}
