import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DefaultFilter } from './default.filter';
import {
  SortObj,
  TransformedDefaultFilter,
} from './transformed.default.filter';

export class DefaultFilterTransformerPipe<Entity, FilterEntity>
  implements
    PipeTransform<
      DefaultFilter<Entity> & FilterEntity,
      TransformedDefaultFilter<Entity> & FilterEntity
    >
{
  transform(
    value: DefaultFilter<Entity> & FilterEntity,
    metadata: ArgumentMetadata,
  ): TransformedDefaultFilter<Entity> & FilterEntity {
    console.log(metadata);

    const order = value.sort?.field
      ? ({
          [value.sort.field as keyof Entity]: {
            nulls: value.sort.nulls ?? 'last',
            direction: value.sort.by ?? 'DESC',
          },
        } as { [Key in keyof Entity]?: SortObj })
      : undefined;

    return {
      ...value,
      search: value.search,
      order,
      take: value.pagination?.len ?? 25,
      skip: ((value.pagination?.page ?? 1) - 1) * (value.pagination?.len ?? 25),
    } as any;
  }
}
