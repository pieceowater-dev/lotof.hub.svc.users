import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Friendship } from './entities/friendship.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('FRIENDSHIP_REPOSITORY')
    private friendshipRepository: Repository<Friendship>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createFriendshipDto: CreateFriendshipDto): Promise<Friendship> {
    const user = await this.userRepository.findOne({
      where: { id: createFriendshipDto.userId },
    });
    const friend = await this.userRepository.findOne({
      where: { id: createFriendshipDto.friendId },
    });

    if (!user || !friend) {
      throw new Error('User or Friend not found');
    }

    const friendship = this.friendshipRepository.create({
      user,
      friend,
    });

    return this.friendshipRepository.save(friendship);
  }

  async findFriends(userId: string): Promise<Friendship[]> {
    //TODO: solve why IDE is not recognizing userId in where clause but works fine and lints fine. lol, wtf
    console.log(userId);
    return this.friendshipRepository.find({
      where: { user: { id: userId } },
      relations: ['friend'],
    });
  }
}
