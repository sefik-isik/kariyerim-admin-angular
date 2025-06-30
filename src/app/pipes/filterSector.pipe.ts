import { Pipe, PipeTransform } from '@angular/core';
import { Sector } from '../models/component/sector';

@Pipe({
  name: 'filterSector',
})
export class FilterSectorPipe implements PipeTransform {
  transform(value: Sector[], filterText: string): Sector[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Sector) =>
            c.sectorName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
