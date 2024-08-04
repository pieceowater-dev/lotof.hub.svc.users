import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { PaginatedEntity } from '../../utils/paginated.entity';
import { Repository, ILike } from 'typeorm';
import { toPaginated } from '../../utils/toPaginated';
import { DefaultFilter } from '../../utils/default.filter';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.save(createItemDto);
  }

  async findAll(data: DefaultFilter<Item>): Promise<PaginatedEntity<Item>> {
    return await this.itemRepository
      .findAndCount({
        where: {
          name: data.search
            ? ILike(`%${data.search?.toLowerCase()}%`)
            : undefined,
        },
        skip: data.pagination.page * data.pagination.length,
        take: data.pagination.length,
        order: {
          [data.sort.field ?? 'id']: data.sort.by ?? 'DESC',
        },
      })
      .then(toPaginated<Item>);
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.itemRepository.save({ id, ...updateItemDto });
  }
}
