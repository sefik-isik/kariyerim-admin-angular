import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/component/country';

@Pipe({
  name: 'filterCountry',
})
export class FilterCountryPipe implements PipeTransform {
  transform(value: Country[], filterText: string): Country[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Country) =>
            c.countryName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
