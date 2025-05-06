import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserAddressDTO } from '../models/personelUserAddressDTO';

@Pipe({
  name: 'filterPersonelUserAddressByUser',
})
export class FilterPersonelUserAddressByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserAddressDTO[],
    filterText: string
  ): PersonelUserAddressDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserAddressDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
