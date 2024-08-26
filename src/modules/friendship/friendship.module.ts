import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { friendshipProvider } from './friendship.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [FriendshipController],
  providers: [...friendshipProvider, FriendshipService],
})
export class FriendshipModule {}
