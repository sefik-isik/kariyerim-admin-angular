import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserAdvertJobDescriptionDTO } from '../models/dto/companyUserAdvertJobDescriptionDTO';

@Pipe({
  name: 'filterCompanyUserAdvertJobDescriptionByCompanyUser',
})
export class FilterCompanyUserAdvertJobDescriptionByCompanyUserPipe
  implements PipeTransform
{
  transform(
    value: CompanyUserAdvertJobDescriptionDTO[],
    filterText: string
  ): CompanyUserAdvertJobDescriptionDTO[] {
    filterText =
      filterText && filterText.length > 0
        ? filterText.toLocaleLowerCase()
        : null;

    return filterText
      ? value.filter(
          (c: CompanyUserAdvertJobDescriptionDTO) =>
            c.companyUserName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
