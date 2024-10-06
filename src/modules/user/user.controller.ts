import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUuid } from '../../utils/user/user-uuid';
import {
  ExceptionFilter,
  ServiceRequestTimeoutPipe,
} from '@pieceowater-dev/lotof.lib.broadcaster';
import { DefaultFilterTransformerPipe } from '../../utils/default.filter.transformer.pipe';
import { ID } from '../../utils/ID';
import { UserFilterDto } from './dto/user.filter.dto';
import { UserEmail } from './types/user-email';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ServiceRequestTimeoutPipe())
  @UseFilters(new ExceptionFilter())
  @MessagePattern('createUser')
  create(@Payload() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UsePipes(new DefaultFilterTransformerPipe<User, UserFilterDto>())
  @MessagePattern('findAllUser')
  findAll(data: UserFilterDto) {
    return this.userService.findAll(data);
  }

  @MessagePattern('findOneUser')
  findOne({ id }: UserUuid) {
    return this.userService.findOne(id);
  }

  @MessagePattern('findOneUserByEmail')
  findOneByEmail({ email }: UserEmail) {
    return this.userService.findOneByEmail(email);
  }

  @MessagePattern('findOneUserWithFriends')
  findOneWithFriends({ id }: ID) {
    return this.userService.findOneWithFriends(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() data: UpdateUserDto) {
    return this.userService.update(data.id, data);
  }
}
