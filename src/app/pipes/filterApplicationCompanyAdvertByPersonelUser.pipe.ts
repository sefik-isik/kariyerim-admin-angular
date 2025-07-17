import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserAdvertApplicationDTO } from '../models/dto/personelUserAdvertApplicationDTO';

@Pipe({
  name: 'filterApplicationCompanyAdvertByPersonelUser',
})
export class FilterApplicationCompanyAdvertByPersonelUserPipe
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
            c.personelUserMail.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
