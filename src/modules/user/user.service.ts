import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ILike, Repository, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DefaultFilter } from '../../utils/default.filter';
import { PaginatedEntity } from '../../utils/paginated.entity';
import { toPaginated } from '../../utils/toPaginated';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { ServiceError } from '@pieceowater-dev/lotof.lib.broadcaster';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User | void> {
    return await this.userRepository
      .save(plainToInstance(User, data))
      .catch((err) => {
        if (err.message.includes('duplicate')) {
          throw new ServiceError('Email is exists');
        }
        throw err;
      });
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

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneWithFriends(id: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: ['friends'],
      where: { id },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.userRepository.save(
      plainToInstance(User, { id, ...data }),
    );
  }

  async addFriend(
    user: User,
    friend: User,
    opt?: { entityManager?: EntityManager },
  ): Promise<'OK'> {
    if (opt?.entityManager) {
      return await opt?.entityManager
        .getRepository(User)
        .createQueryBuilder()
        .relation(User, 'friends')
        .of(user)
        .add(friend)
        .then(() => 'OK');
    }
    return await this.userRepository
      .createQueryBuilder()
      .relation(User, 'friends')
      .of(user)
      .add(friend)
      .then(() => 'OK');
  }
}
