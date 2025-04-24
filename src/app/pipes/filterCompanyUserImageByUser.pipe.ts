import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserImageDTO } from '../models/companyUserImageDTO';

@Pipe({
  name: 'filterCompanyUserImageByUser',
})
export class FilterCompanyUserImageByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserImageDTO[],
    filterText: string
  ): CompanyUserImageDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserImageDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
