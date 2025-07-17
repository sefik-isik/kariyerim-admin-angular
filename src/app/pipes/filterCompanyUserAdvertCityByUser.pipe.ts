import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserAdvertCityDTO } from '../models/dto/companyUserAdvertCityDTO';

@Pipe({
  name: 'filterCompanyUserAdvertCityByUser',
})
export class FilterCompanyUserAdvertCityByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserAdvertCityDTO[],
    filterText: string
  ): CompanyUserAdvertCityDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserAdvertCityDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
