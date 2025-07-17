import { Pipe, PipeTransform } from '@angular/core';
import { PositionLevel } from '../models/component/positionLevel';

@Pipe({
  name: 'filterPositionLevel',
})
export class FilterPositionLevelPipe implements PipeTransform {
  transform(value: PositionLevel[], filterText: string): PositionLevel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PositionLevel) =>
            c.positionLevelName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
