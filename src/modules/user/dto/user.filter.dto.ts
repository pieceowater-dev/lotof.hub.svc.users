import { TransformedDefaultFilter } from '../../../utils/transformed.default.filter';
import { User } from '../entities/user.entity';

export class UserFilterDto extends TransformedDefaultFilter<
  Omit<User, 'passwordCrypt' | 'friends'>
> {}
