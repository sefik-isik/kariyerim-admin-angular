import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserFileDTO } from '../models/personelUserFileDTO';

@Pipe({
  name: 'filterPersonelUserFileByUser',
})
export class FilterPersonelUserFileByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserFileDTO[],
    filterText: string
  ): PersonelUserFileDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserFileDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
