import { ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.friendships)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn()
  friend: User;
}
