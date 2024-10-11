import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(authDto: LoginAuthDto) {
    const user = await this.userService.findOneByEmail(authDto.email);

    if (
      user === null ||
      user.deleted === true ||
      !compareSync(authDto.password, user.password)
    ) {
      throw new Error('Incorrect user or password');
    }

    return user;
  }

  register(registerAuthDto: RegisterAuthDto) {
    return this.userService.create(registerAuthDto);
  }
}
