import { Pipe, PipeTransform } from '@angular/core';
import { RegionDTO } from '../models/regionDTO';

@Pipe({
  name: 'filterRegion',
})
export class FilterRegionPipe implements PipeTransform {
  transform(value: RegionDTO[], filterText: string): RegionDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: RegionDTO) =>
            c.regionName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
