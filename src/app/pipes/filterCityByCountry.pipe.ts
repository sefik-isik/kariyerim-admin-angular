import { Pipe, PipeTransform } from '@angular/core';
import { CityDTO } from '../models/cityDTO';

@Pipe({
  name: 'filterCityByCountry',
})
export class FilterCityByCountryPipe implements PipeTransform {
  transform(value: CityDTO[], filterText: string): CityDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CityDTO) =>
            c.countryName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
