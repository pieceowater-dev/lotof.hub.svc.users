import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt';
import { UserState } from '../../../utils/user/user-state.util';

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

  @Column({ nullable: true, default: UserState.SUSPENDED })
  state: UserState;

  @Column({ default: false })
  deleted: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  passwordCrypt() {
    if (this.password) {
      this.password = hashSync(this.password, genSaltSync());
    }
  }
}
