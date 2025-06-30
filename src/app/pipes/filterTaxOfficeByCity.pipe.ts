import { Pipe, PipeTransform } from '@angular/core';
import { TaxOfficeDTO } from '../models/dto/taxOfficeDTO';

@Pipe({
  name: 'filterTaxOfficeByCity',
})
export class FilterTaxOfficeByCityPipe implements PipeTransform {
  transform(value: TaxOfficeDTO[], filterText: string): TaxOfficeDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: TaxOfficeDTO) =>
            c.cityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
