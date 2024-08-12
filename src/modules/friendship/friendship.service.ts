import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository, DataSource, ILike } from 'typeorm';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { Friendship } from './entities/friendship.entity';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/entities/user.entity';
import { ServiceError } from '@pieceowater-dev/lotof.lib.broadcaster';
import { UserService } from '../user/user.service';
import { PaginatedEntity } from '../../utils/paginated.entity';
import { toPaginated } from '../../utils/toPaginated';
import { FriendshipFilter } from './entities/friendship.filter';

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    @Inject('FRIENDSHIP_REPOSITORY')
    private readonly friendshipRepository: Repository<Friendship>,
    private readonly userService: UserService,
  ) {}

  async createRequest(
    createFriendshipDto: CreateFriendshipDto,
  ): Promise<Friendship> {
    const existsRequest = await this.findFriendRequest(createFriendshipDto);
    if (existsRequest === null) {
      return await this.friendshipRepository.save(
        plainToInstance(Friendship, createFriendshipDto),
      );
    }

    if (
      existsRequest.userId.id === createFriendshipDto.userId &&
      existsRequest.friendId.id === createFriendshipDto.friendId
    ) {
      throw new ServiceError('Request is exists');
    }

    await this.acceptRequest(existsRequest);
  }

  async acceptRequestByID(id: number) {
    return await this.acceptRequest(await this.findFriendRequestById(id));
  }

  async getRequestList(
    friendshipFilter: FriendshipFilter,
  ): Promise<PaginatedEntity<Friendship>> {
    return await this.friendshipRepository
      .findAndCount({
        relations: ['userId', 'friendId'],
        where: {
          friendId: plainToInstance(User, {
            username: friendshipFilter.search
              ? ILike(`%${friendshipFilter.search}%`)
              : undefined,
          }),
        },
        order: friendshipFilter.order,
        take: friendshipFilter.take,
        skip: friendshipFilter.skip,
      })
      .then((r) => toPaginated<Friendship>(r));
  }

  private async acceptRequest(request: Friendship): Promise<'OK'> {
    return await this.dataSource.transaction(
      async (entityManager): Promise<'OK'> => {
        await this.removeRequest(request.id, { entityManager });
        await this.userService.addFriend(request.userId, request.friendId, {
          entityManager,
        });
        await this.userService.addFriend(request.friendId, request.userId, {
          entityManager,
        });
        return 'OK';
      },
    );
  }

  private async findFriendRequest(
    createFriendshipDto: CreateFriendshipDto,
  ): Promise<Friendship | null> {
    return await this.friendshipRepository.findOne({
      relations: ['userId', 'friendId'],
      where: [
        {
          userId: plainToInstance(User, { id: createFriendshipDto.userId }),
          friendId: plainToInstance(User, { id: createFriendshipDto.friendId }),
        },
        {
          userId: plainToInstance(User, { id: createFriendshipDto.friendId }),
          friendId: plainToInstance(User, { id: createFriendshipDto.userId }),
        },
      ],
    });
  }

  private async findFriendRequestById(id: number): Promise<Friendship | null> {
    return await this.friendshipRepository.findOne({
      relations: ['userId', 'friendId'],
      where: { id },
    });
  }

  private async removeRequest(
    id: number,
    opt?: { entityManager?: EntityManager },
  ) {
    if (opt?.entityManager) {
      return opt.entityManager.getRepository(Friendship).delete(id);
    }
    return await this.friendshipRepository.delete(id);
  }
}
