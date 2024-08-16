import { IsUUID } from 'class-validator';

export class CreateFriendshipDto {
  @IsUUID()
  user: string;

  @IsUUID()
  friend: string;
}
