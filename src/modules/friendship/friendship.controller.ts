import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ID } from '../../utils/ID';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @MessagePattern('createFriendship')
  createRequest(@Payload() data: CreateFriendshipDto) {
    return this.friendshipService.createRequest(data);
  }

  @MessagePattern('createFriendship')
  removeRequest(@Payload() { id }: ID<number>) {
    return this.friendshipService.acceptRequestByID(id);
  }
}
