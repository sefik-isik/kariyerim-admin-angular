import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserAdvertJobDescriptionDTO } from '../models/dto/companyUserAdvertJobDescriptionDTO';

@Pipe({
  name: 'filterCompanyUserAdvertJobDescriptionByUser',
})
export class FilterCompanyUserAdvertJobDescriptionByUserPipe
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
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
