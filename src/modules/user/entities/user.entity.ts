import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Friendship } from '../../friendship/entities/friendship.entity';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true, update: false })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Friendship, (friendship) => friendship.user)
  friendships: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.friend)
  friends: Friendship[];

  @BeforeInsert()
  @BeforeUpdate()
  passwordCrypt() {
    if (this.password) {
      this.password = hashSync(this.password, genSaltSync());
    }
  }
}
