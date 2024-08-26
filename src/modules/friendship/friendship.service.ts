import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, ILike, Repository } from 'typeorm';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { Friendship } from './entities/friendship.entity';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/entities/user.entity';
import {
  ServiceError,
  PaginatedEntity,
  toPaginated,
} from '@pieceowater-dev/lotof.lib.broadcaster';
import { UserService } from '../user/user.service';
import { FriendshipFilter } from './entities/friendship.filter';
import { InOut } from './enum/InOut';

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
      existsRequest.user.id === createFriendshipDto.user &&
      existsRequest.friend.id === createFriendshipDto.friend
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
        relations: ['user', 'friend'],
        where:
          friendshipFilter.inout === InOut.IN
            ? {
                friend: plainToInstance(User, {
                  username: friendshipFilter.search
                    ? ILike(`%${friendshipFilter.search}%`)
                    : undefined,
                }),
                user: plainToInstance(User, {
                  id: friendshipFilter.userId,
                }),
              }
            : {
                user: plainToInstance(User, {
                  username: friendshipFilter.search
                    ? ILike(`%${friendshipFilter.search}%`)
                    : undefined,
                }),
                friend: plainToInstance(User, {
                  id: friendshipFilter.userId,
                }),
              },
        order: friendshipFilter.order,
        take: friendshipFilter.take,
        skip: friendshipFilter.skip,
      })
      .then((r) => toPaginated<Friendship>(r));
  }

  async removeRequest(id: number, opt?: { entityManager?: EntityManager }) {
    if (opt?.entityManager) {
      return opt.entityManager.getRepository(Friendship).delete(id);
    }
    return await this.friendshipRepository.delete(id);
  }

  private async acceptRequest(request: Friendship): Promise<'OK'> {
    return await this.dataSource.transaction(
      async (entityManager): Promise<'OK'> => {
        await this.removeRequest(request.id, { entityManager });
        await this.userService.addFriend(request.user, request.friend, {
          entityManager,
        });
        await this.userService.addFriend(request.friend, request.user, {
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
      relations: ['user', 'friend'],
      where: [
        {
          user: plainToInstance(User, { id: createFriendshipDto.user }),
          friend: plainToInstance(User, { id: createFriendshipDto.friend }),
        },
        {
          user: plainToInstance(User, { id: createFriendshipDto.friend }),
          friend: plainToInstance(User, { id: createFriendshipDto.user }),
        },
      ],
    });
  }

  private async findFriendRequestById(id: number): Promise<Friendship | null> {
    return await this.friendshipRepository.findOne({
      relations: ['user', 'friend'],
      where: { id },
    });
  }
}
