import { Injectable } from '@nestjs/common';
import { AuthUserLogin } from '../../domains/AuthUsers/application/AuthUsersLogin';
import { LoginDto } from './models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoginService {
  constructor(
    @InjectPinoLogger(LoginService.name)
    private readonly logger: PinoLogger,
    private readonly authUserLogin: AuthUserLogin,
    private readonly jwtService: JwtService,
  ) {}

  public async login({ username, password }: LoginDto) {
    const user = await this.authUserLogin.invoke(username, password);

    const accessToken = this.jwtService.sign(user);
    const expire = (this.jwtService.decode(accessToken) as any).exp;

    return {
      accessToken,
      expire,
    };
  }
}
