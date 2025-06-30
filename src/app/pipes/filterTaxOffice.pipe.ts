import { Pipe, PipeTransform } from '@angular/core';
import { TaxOfficeDTO } from '../models/dto/taxOfficeDTO';

@Pipe({
  name: 'filterTaxOffice',
})
export class FilterTaxOfficePipe implements PipeTransform {
  transform(value: TaxOfficeDTO[], filterText: string): TaxOfficeDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: TaxOfficeDTO) =>
            c.taxOfficeName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
