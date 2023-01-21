import { Injectable } from '@nestjs/common';
import { AuthUserLogin } from '../../domains/AuthUsers/application/AuthUsersLogin';
import { WorkerDto } from './models/workers.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class WorkersService {
  constructor(
    @InjectPinoLogger(WorkersService.name)
    private readonly logger: PinoLogger,
  ) {}

  public async create({ name }: WorkerDto) {
    return {
      name,
      uuid: Date.now().toString(),
    };
  }
}
