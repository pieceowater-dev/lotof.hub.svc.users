import { PaginatedEntity } from './paginated.entity';

export const toPaginated = <Item>(data: any[]): PaginatedEntity<Item> => ({
  rows: data[0],
  info: {
    count: data[1],
  },
});
