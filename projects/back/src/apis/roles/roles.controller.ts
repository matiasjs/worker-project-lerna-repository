import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '@shared/guards/jwt.auth.guard';
import { RolesService } from './roles.service';

import { RolesGetAllResponseDto } from './models/roles-get-all.dto';
import { AllowRoles, ReqUser } from '@shared/decorators';
import { RolesEnum } from 'shared-workers';
import { RolesGuard } from '@shared/guards/roles.guard';
import { OwnAuthGuard } from '@shared/guards/own-auth-guard';
import { AuthenticatedUserGuard } from '@shared/guards/authenticated-user-guard';

@ApiTags('Roles')
@Controller('v1/roles')
// @UseGuards(OwnAuthGuard, RolesGuard, AuthenticatedUserGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ description: 'Get all roles' })
  @ApiCreatedResponse({ type: RolesGetAllResponseDto })
  @Get('')
  // @UseGuards(JwtAuthGuard)
  async getUSerByEmail(): Promise<RolesGetAllResponseDto> {
    return this.rolesService.getAll();
  }
}
