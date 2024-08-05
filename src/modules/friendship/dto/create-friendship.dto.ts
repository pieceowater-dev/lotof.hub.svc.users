import { IsUUID } from 'class-validator';

export class CreateFriendshipDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  friendId: string;
}
