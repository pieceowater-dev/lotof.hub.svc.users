import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../core/database/database.module';
import { userProvider } from './user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProvider, UserService],
})
export class UserModule {}
