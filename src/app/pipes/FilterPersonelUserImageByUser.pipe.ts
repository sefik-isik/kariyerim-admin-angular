import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserImageDTO } from '../models/dto/personelUserImageDTO';

@Pipe({
  name: 'filterPersonelUserImageByUserPipe',
})
export class FilterPersonelUserImageByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserImageDTO[],
    filterText: string
  ): PersonelUserImageDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserImageDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
