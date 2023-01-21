import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { WorkerDto, WorkerResponse } from './models/workers.dto';
import { WorkersService } from './workers.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt.auth.guard';

@ApiTags('Workers')
@Controller('v1/workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @ApiOperation({ description: 'Add a worker' })
  @ApiCreatedResponse({ type: WorkerResponse })
  @Post('')
  @UseGuards(JwtAuthGuard)
  async login(@Body() worker: WorkerDto): Promise<WorkerResponse> {
    return this.workersService.create(worker);
  }
}
