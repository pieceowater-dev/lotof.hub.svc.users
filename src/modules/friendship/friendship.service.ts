import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friendship } from './entities/friendship.entity';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFriendshipDto: CreateFriendshipDto) {
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

  findAll() {
    return this.friendshipRepository.find({ relations: ['user', 'friend'] });
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return this.friendshipRepository.update(id, updateFriendshipDto);
  }
}
