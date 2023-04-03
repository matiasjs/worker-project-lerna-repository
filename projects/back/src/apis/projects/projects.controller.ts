import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from '@shared/guards/jwt.auth.guard';

import { ReqUser } from '@shared/decorators';
import { ProjectsCreateInput, RolesEnum } from 'shared-workers';
import { RolesGuard } from '@shared/guards/roles.guard';
import { OwnAuthGuard } from '@shared/guards/own-auth-guard';
import { AuthenticatedUserGuard } from '@shared/guards/authenticated-user-guard';
import { ProjectsCreateResponseDto } from './models/projects-create.dto';
import { ProjectsService } from './projects.service';
import { LoggedUser } from '@shared/models/logged-user.model';
import { ProjectsGetManyResponseDto } from './models/projects-get-many.dto';

@ApiTags('Projects')
@Controller('v1/projects')
@UseGuards(OwnAuthGuard, RolesGuard, AuthenticatedUserGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ description: 'Create project' })
  @ApiCreatedResponse({ type: ProjectsCreateResponseDto })
  @Post('')
  @UseGuards(JwtAuthGuard)
  async create(
    @ReqUser() user: LoggedUser,
    @Body() project: ProjectsCreateInput,
  ): Promise<ProjectsCreateResponseDto> {
    return this.projectsService.create({
      ...project,
      ownerId: user._id,
    });
  }

  @ApiOperation({ description: 'Get my own projects' })
  @ApiCreatedResponse({ type: [ProjectsGetManyResponseDto] })
  @Get('myself')
  @UseGuards(JwtAuthGuard)
  async myself(
    @ReqUser() user: LoggedUser,
  ): Promise<ProjectsGetManyResponseDto[]> {
    return this.projectsService.myself(user._id);
  }
}
