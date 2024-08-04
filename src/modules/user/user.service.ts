import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DefaultFilter } from '../../utils/default.filter';
import { PaginatedEntity } from '../../utils/paginated.entity';
import { toPaginated } from '../../utils/toPaginated';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.save(data);
  }

  async findAll(data: DefaultFilter<User>): Promise<PaginatedEntity<User>> {
    return await this.userRepository
      .findAndCount({
        where: {
          username: data.search
            ? ILike(`%${data.search?.toLowerCase()}%`)
            : undefined,
        },
        skip: data.pagination.page * data.pagination.length,
        take: data.pagination.length,
        order: {
          [data.sort.field ?? 'id']: data.sort.by ?? 'DESC',
        },
      })
      .then(toPaginated<User>);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.userRepository.save({ id, ...data });
  }
}
