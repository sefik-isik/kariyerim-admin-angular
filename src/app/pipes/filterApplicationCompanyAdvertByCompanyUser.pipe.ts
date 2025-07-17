import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserAdvertApplicationDTO } from '../models/dto/personelUserAdvertApplicationDTO';

@Pipe({
  name: 'filterApplicationCompanyAdvertByCompanyUser',
})
export class FilterApplicationCompanyAdvertByCompanyUserPipe
  implements PipeTransform
{
  transform(
    value: PersonelUserAdvertApplicationDTO[],
    filterText: string
  ): PersonelUserAdvertApplicationDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserAdvertApplicationDTO) =>
            c.companyUserName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
