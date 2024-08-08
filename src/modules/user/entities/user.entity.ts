import {
  Column,
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
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

  @BeforeInsert()
  @BeforeUpdate()
  passwordCrypt() {
    if (this.password) {
      this.password = hashSync(this.password, genSaltSync());
    }
  }
}
