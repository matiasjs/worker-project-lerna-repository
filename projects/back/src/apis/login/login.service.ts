import { Injectable } from '@nestjs/common';
import { UserLogin } from '@domains/Users/application/UsersLogin';
import { LoginInputDto } from './models/login.model.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoginService {
  constructor(
    @InjectPinoLogger(LoginService.name)
    private readonly logger: PinoLogger,
    private readonly authUserLogin: UserLogin,
    private readonly jwtService: JwtService,
  ) {}

  public async login({ email, password }: LoginInputDto) {
    const user = await this.authUserLogin.invoke(email, password);
    const accessToken = this.jwtService.sign(user);
    const expire = (this.jwtService.decode(accessToken) as any).exp;

    return {
      accessToken,
      expire,
    };
  }
}
