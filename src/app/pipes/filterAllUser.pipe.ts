import { Pipe, PipeTransform } from '@angular/core';
import { UserDTO } from '../models/dto/userDTO';

@Pipe({
  name: 'filterAllUser',
})
export class FilterAllUserPipe implements PipeTransform {
  transform(value: UserDTO[], filterText: string): UserDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UserDTO) => c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
