import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { DefaultFilter } from '../../utils/default.filter';
import { Friendship } from './entities/friendship.entity';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @MessagePattern('createFriendship')
  create(@Payload() data: CreateFriendshipDto) {
    return this.friendshipService.create(data);
  }

  @MessagePattern('findAllFriendships')
  findAll(data: DefaultFilter<Friendship>) {
    return this.friendshipService.findAll();
  }

  @MessagePattern('updateFriendship')
  update(@Payload() data: UpdateFriendshipDto) {
    return this.friendshipService.update(data.id, data);
  }
}