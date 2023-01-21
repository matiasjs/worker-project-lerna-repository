import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { LoginDto, LoginResponse } from './models/login.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({
    description: 'Returns a JWT after a successful login {UserLoginInput}',
  })
  @ApiTags('UserLoginInput')
  @ApiCreatedResponse({ type: LoginResponse })
  @Post('v1/login')
  async login(@Body() user: LoginDto): Promise<LoginResponse | any> {
    return this.loginService.login(user);
  }
}
