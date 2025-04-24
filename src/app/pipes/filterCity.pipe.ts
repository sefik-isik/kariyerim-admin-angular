import { Pipe, PipeTransform } from '@angular/core';
import { CityDTO } from '../models/cityDTO';

@Pipe({
  name: 'filterCity',
})
export class FilterCityPipe implements PipeTransform {
  transform(value: CityDTO[], filterText: string): CityDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CityDTO) =>
            c.cityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
