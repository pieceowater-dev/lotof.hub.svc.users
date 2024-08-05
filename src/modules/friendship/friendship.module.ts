import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { friendshipProvider } from './friendship.provider';
import { userProvider } from '../user/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendshipController],
  providers: [...friendshipProvider, ...userProvider, FriendshipService],
})
export class FriendshipModule {}
