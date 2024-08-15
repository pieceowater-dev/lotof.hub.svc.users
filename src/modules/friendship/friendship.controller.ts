import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ID } from '../../utils/ID';
import { DefaultFilterTransformerPipe } from '../../utils/default.filter.transformer.pipe';
import { Friendship } from './entities/friendship.entity';
import { FriendshipFilter } from './entities/friendship.filter';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @MessagePattern('createFriendship')
  createRequest(@Payload() data: CreateFriendshipDto) {
    return this.friendshipService.createRequest(data);
  }

  @MessagePattern('acceptRequest')
  acceptRequest(@Payload() { id }: ID<number>) {
    return this.friendshipService.acceptRequestByID(id);
  }

  @MessagePattern('removeRequest')
  removeRequest(@Payload() { id }: ID<number>) {
    return this.friendshipService.removeRequest(id);
  }

  @UsePipes(new DefaultFilterTransformerPipe<Friendship, FriendshipFilter>())
  @MessagePattern('getFriendshipRequestList')
  getRequestList(@Payload() friendshipFilter: FriendshipFilter) {
    return this.friendshipService.getRequestList(friendshipFilter);
  }
}
