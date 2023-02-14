import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '@shared/guards/jwt.auth.guard';
import { SpecializationsService } from './specializations.service';

import { SpecializationsGetAllResponseDto } from './models/specializations-get-all.dto';
import { RolesGuard } from '@shared/guards/roles.guard';
import { OwnAuthGuard } from '@shared/guards/own-auth-guard';
import { AuthenticatedUserGuard } from '@shared/guards/authenticated-user-guard';

@ApiTags('Specializations')
@Controller('v1/specializations')
// @UseGuards(OwnAuthGuard, RolesGuard, AuthenticatedUserGuard)
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @ApiOperation({ description: 'Get all specializations' })
  @ApiCreatedResponse({ type: SpecializationsGetAllResponseDto })
  @Get('')
  // @UseGuards(JwtAuthGuard)
  async getAllSpecializations(): Promise<SpecializationsGetAllResponseDto> {
    return this.specializationsService.getAll();
  }
}
