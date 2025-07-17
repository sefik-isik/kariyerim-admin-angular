import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserAdvertFollowDTO } from '../models/dto/personelUserAdvertFollowDTO';

@Pipe({
  name: 'filterFollowCompanyAdvertByCompanyUser',
})
export class FilterFollowCompanyAdvertByCompanyUserPipe
  implements PipeTransform
{
  transform(
    value: PersonelUserAdvertFollowDTO[],
    filterText: string
  ): PersonelUserAdvertFollowDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserAdvertFollowDTO) =>
            c.companyUserName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
