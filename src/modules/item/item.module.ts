import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { itemProvider } from './item.provider';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [...itemProvider, ItemService],
})
export class ItemModule {}
