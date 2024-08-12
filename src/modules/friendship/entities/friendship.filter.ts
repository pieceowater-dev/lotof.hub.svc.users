import { TransformedDefaultFilter } from '../../../utils/transformed.default.filter';
import { Friendship } from './friendship.entity';

export class FriendshipFilter extends TransformedDefaultFilter<Friendship> {
  userId: string;
}
