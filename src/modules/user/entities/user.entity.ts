import {
  Column,
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { UserState } from '../../../utils/user/user-state.util';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true, update: false })
  email: string;

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable({
    name: 'friendships',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'friendId',
      referencedColumnName: 'id',
    },
  })
  friends: User[];

  @Column({ nullable: true, default: UserState.SUSPENDED })
  state: UserState;

  @Column({ default: false })
  deleted: boolean;
}
