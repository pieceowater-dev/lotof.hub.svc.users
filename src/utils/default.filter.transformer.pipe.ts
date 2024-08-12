import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { DefaultFilter } from './default.filter';
import { SortObj } from './transformed.default.filter';

export class DefaultFilterTransformerPipe<Entity, OutgoingFilter = any>
  implements PipeTransform<DefaultFilter<Entity>, OutgoingFilter>
{
  transform(
    value: DefaultFilter<Entity>,
    metadata: ArgumentMetadata,
  ): OutgoingFilter {
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
      search: value.search,
      order,
      take: value.pagination?.len ?? 25,
      skip: ((value.pagination?.page ?? 1) - 1) * (value.pagination?.len ?? 25),
    } as any;
  }
}
