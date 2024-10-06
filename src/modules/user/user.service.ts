import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { ILike, Repository, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import {
  ServiceError,
  toPaginated,
} from '@pieceowater-dev/lotof.lib.broadcaster';
import { PaginatedEntity } from '@pieceowater-dev/lotof.lib.broadcaster/utils/pagination/entity.pagination';
import { UserFilterDto } from './dto/user.filter.dto';

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

  async findAll(userFilterDto: UserFilterDto): Promise<PaginatedEntity<User>> {
    return await this.userRepository
      .findAndCount({
        where: {
          username: userFilterDto.search
            ? ILike(`%${userFilterDto.search?.toLowerCase()}%`)
            : undefined,
        },
        skip: userFilterDto.skip,
        take: userFilterDto.take,
        order: userFilterDto.order,
      })
      .then(toPaginated<User>);
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
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
