import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { LoginInputDto, LoginResponseDto } from './models/login.model.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({
    description: 'Returns a JWT after a successful login {UserLoginInput}',
  })
  @ApiTags('UserLoginInput')
  @ApiCreatedResponse({ type: LoginResponseDto })
  @Post('v1/login')
  async login(@Body() user: LoginInputDto): Promise<LoginResponseDto> {
    return this.loginService.login(user);
  }
}
