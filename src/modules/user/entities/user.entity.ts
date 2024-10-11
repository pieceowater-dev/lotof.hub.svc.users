import {
  Column,
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { UserState } from '../../../utils/user/user-state.util';
import { genSaltSync, hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true, update: false })
  email: string;

  @Column({ type: 'varchar', length: 255 })
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

  @Column({ nullable: true, default: UserState.SUSPENDED })
  state: UserState;

  @Column({ default: false })
  deleted: boolean;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  createdAt: string;

  @Column({ type: 'timestamp without time zone', default: () => 'now()' })
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPasswordIfExist() {
    if (this.password) {
      this.password = hashSync(this.password, genSaltSync(12));
    }
  }

  @BeforeUpdate()
  setUpdatedAtDate() {
    this.updatedAt = new Date().toJSON();
  }
}
