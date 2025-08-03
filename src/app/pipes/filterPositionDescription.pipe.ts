import { Pipe, PipeTransform } from '@angular/core';
import { PositionDescriptionDTO } from '../models/dto/positionDescriptionDTO';

@Pipe({
  name: 'filterPositionDescription',
})
export class FilterPositionDescriptionPipe implements PipeTransform {
  transform(
    value: PositionDescriptionDTO[],
    filterText: string
  ): PositionDescriptionDTO[] {
    filterText =
      filterText && filterText.length > 0
        ? filterText.toLocaleLowerCase()
        : null;

    return filterText
      ? value.filter(
          (c: PositionDescriptionDTO) =>
            c.positionName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : null;
  }
}
