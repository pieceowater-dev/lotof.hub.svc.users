import { TransformedDefaultFilter } from '../../../utils/transformed.default.filter';
import { Friendship } from './friendship.entity';
import { InOut } from '../enum/InOut';

export class FriendshipFilter extends TransformedDefaultFilter<Friendship> {
  // change to current user id ( from token )
  userId: string;
  inout: InOut;
}
