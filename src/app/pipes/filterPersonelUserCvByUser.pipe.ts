import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserCvDTO } from '../models/dto/personelUserCvDTO';

@Pipe({
  name: 'filterPersonelUserCvByUser',
})
export class FilterPersonelUserCvByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserCvDTO[],
    filterText: string
  ): PersonelUserCvDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserCvDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
