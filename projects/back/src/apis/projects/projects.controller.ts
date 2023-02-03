import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '@shared/guards/jwt.auth.guard';

import { AllowRoles, ReqUser } from '@shared/decorators';
import { ProjectsCreateInput, RolesEnum } from 'shared-workers';
import { RolesGuard } from '@shared/guards/roles.guard';
import { OwnAuthGuard } from '@shared/guards/own-auth-guard';
import { AuthenticatedUserGuard } from '@shared/guards/authenticated-user-guard';
import { ProjectsCreateResponseDto } from './models/projects-create.dto';
import { ProjectsService } from './projects.service';

@ApiTags('Projects')
@Controller('v1/projects')
@UseGuards(OwnAuthGuard, RolesGuard, AuthenticatedUserGuard)
export class RolesController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ description: 'Create project' })
  @ApiCreatedResponse({ type: ProjectsCreateResponseDto })
  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() project: ProjectsCreateInput,
  ): Promise<ProjectsCreateResponseDto> {
    return this.projectsService.create(project);
  }
}
