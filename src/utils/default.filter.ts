export enum FilterPaginationLengthEnum {
  TEN = 10,
  FIFTEEN = 15,
  TWENTY = 20,
  TWENTY_FIVE = 25,
  THIRTY = 30,
  THIRTY_FIVE = 35,
  FORTY = 40,
  FORTY_FIVE = 45,
  FIFTY = 50,
  FIFTY_FIVE = 55,
  SIXTY = 60,
  SIXTY_FIVE = 65,
  SEVENTY = 70,
  SEVENTY_FIVE = 75,
  EIGHTY = 80,
  EIGHTY_FIVE = 85,
  NINETY = 90,
  NINETY_FIVE = 95,
  ONE_HUNDRED = 100,
}

export class Sort<T> {
  by?: 'ASC' | 'DESC' = 'ASC';
  field?: keyof T;
}

export class Paginated {
  length?: FilterPaginationLengthEnum = FilterPaginationLengthEnum.TEN;
  page?: number = 0;
}

export class DefaultFilter<T> {
  search?: string;
  sort?: Sort<T>;
  pagination?: Paginated;
}
