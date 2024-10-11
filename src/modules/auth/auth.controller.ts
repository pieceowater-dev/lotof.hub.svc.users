import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('userLogin')
  login(loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @MessagePattern('userRegister')
  register(registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
