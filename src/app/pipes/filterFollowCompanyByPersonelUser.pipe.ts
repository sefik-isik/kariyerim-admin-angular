import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserFollowCompanyUserDTO } from '../models/dto/personelUserFollowCompanyUserDTO';

@Pipe({
  name: 'filterFollowCompanyByPersonelUser',
})
export class FilterFollowCompanyByPersonelUserPipe implements PipeTransform {
  transform(
    value: PersonelUserFollowCompanyUserDTO[],
    filterText: string
  ): PersonelUserFollowCompanyUserDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserFollowCompanyUserDTO) =>
            c.personelUserMail.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
