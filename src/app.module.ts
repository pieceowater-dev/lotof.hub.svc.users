// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigAppModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { FriendshipModule } from './modules/friendship/friendship.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigAppModule,
    HealthModule,
    UserModule,
    FriendshipModule,
  ],
})
export class AppModule {}
