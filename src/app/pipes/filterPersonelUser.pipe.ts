import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserDTO } from '../models/personelUserDTO';

@Pipe({
  name: 'filterPersonelUser',
})
export class FilterPersonelUserPipe implements PipeTransform {
  transform(value: PersonelUserDTO[], filterText: string): PersonelUserDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
