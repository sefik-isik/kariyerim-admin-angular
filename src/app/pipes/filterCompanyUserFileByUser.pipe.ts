import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserFileDTO } from '../models/companyUserFileDTO';

@Pipe({
  name: 'filterCompanyUserFileByUser',
})
export class FilterCompanyUserFileByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserFileDTO[],
    filterText: string
  ): CompanyUserFileDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserFileDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
