type SortDir = 'ASC' | 'DESC' | undefined;
type SortNulls = 'first' | 'last' | undefined;

export interface SortObj {
  direction: SortDir;
  nulls: SortNulls;
}

export class TransformedDefaultFilter<Entity> {
  search?: string;
  order?: {
    [Key in keyof Entity]?: SortObj;
  };
  skip: number;
  take: number;
}
