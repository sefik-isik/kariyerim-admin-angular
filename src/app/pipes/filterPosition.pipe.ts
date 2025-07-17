import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../models/component/position';

@Pipe({
  name: 'filterPosition',
})
export class FilterPositionPipe implements PipeTransform {
  transform(value: Position[], filterText: string): Position[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Position) =>
            c.positionName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
