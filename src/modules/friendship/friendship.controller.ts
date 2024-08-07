import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ID } from '../../utils/ID';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @MessagePattern('createFriendship')
  create(@Payload() data: CreateFriendshipDto) {
    return this.friendshipService.create(data);
  }

  @MessagePattern('findFriends')
  findFriends(@Payload() { id }: ID) {
    return this.friendshipService.findFriends(id);
  }
}
