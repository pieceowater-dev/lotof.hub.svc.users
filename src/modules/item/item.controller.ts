import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { DefaultFilter } from '../../utils/default.filter';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @MessagePattern('createItem')
  create(@Payload() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @MessagePattern('findAllItem')
  findAll(data: DefaultFilter<Item>) {
    return this.itemService.findAll(data);
  }

  @MessagePattern('findOneItem')
  async findOne(@Payload() id: number): Promise<Item> {
    return await this.itemService.findOne(id);
  }

  @MessagePattern('updateItem')
  update(@Payload() updateItemDto: UpdateItemDto) {
    return this.itemService.update(updateItemDto.id, updateItemDto);
  }
}
