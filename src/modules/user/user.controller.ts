import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { DefaultFilter } from '../../utils/default.filter';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ID } from '../../utils/ID';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  create(@Payload() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @MessagePattern('findAllUser')
  findAll(data: DefaultFilter<User>) {
    return this.userService.findAll(data);
  }

  @MessagePattern('findOneUser')
  findOne({ id }: ID) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() data: UpdateUserDto) {
    return this.userService.update(data.id, data);
  }
}
