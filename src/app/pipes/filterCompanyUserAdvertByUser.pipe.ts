import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserAdvertDTO } from '../models/dto/companyUserAdvertDTO';

@Pipe({
  name: 'filterCompanyUserAdvertByUser',
})
export class FilterCompanyUserAdvertByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserAdvertDTO[],
    filterText: string
  ): CompanyUserAdvertDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserAdvertDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
