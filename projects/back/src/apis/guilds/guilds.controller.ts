import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GuildsService } from './guilds.service';

import { SpecializationsGetAllResponseDto } from './models/specializations-get-all.dto';

@ApiTags('Guilds')
@Controller('v1/guilds')
// @UseGuards(OwnAuthGuard, RolesGuard, AuthenticatedUserGuard)
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @ApiOperation({ description: 'Get all guilds' })
  @ApiCreatedResponse({ type: SpecializationsGetAllResponseDto })
  @Get('')
  // @UseGuards(JwtAuthGuard)
  async getAllSpecializations(): Promise<SpecializationsGetAllResponseDto> {
    return this.guildsService.getAll();
  }
}
