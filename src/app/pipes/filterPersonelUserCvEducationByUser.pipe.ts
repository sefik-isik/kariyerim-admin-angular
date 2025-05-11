import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserCvEducationDTO } from '../models/personelUserCvEducationDTO';

@Pipe({
  name: 'filterPersonelUserCvEducationByUser',
})
export class FilterPersonelUserCvEducationByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserCvEducationDTO[],
    filterText: string
  ): PersonelUserCvEducationDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserCvEducationDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
