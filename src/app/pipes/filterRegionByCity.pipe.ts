import { Pipe, PipeTransform } from '@angular/core';
import { RegionDTO } from '../models/dto/regionDTO';

@Pipe({
  name: 'filterRegionByCity',
})
export class FilterRegionByCityPipe implements PipeTransform {
  transform(value: RegionDTO[], filterText: string): RegionDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: RegionDTO) =>
            c.cityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
