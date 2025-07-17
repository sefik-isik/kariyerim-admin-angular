import { PersonelUserFollowCompanyUserDTO } from './../models/dto/personelUserFollowCompanyUserDTO';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFollowCompanyByCompanyUser',
})
export class FilterFollowCompanyByCompanyUserPipe implements PipeTransform {
  transform(
    value: PersonelUserFollowCompanyUserDTO[],
    filterText: string
  ): PersonelUserFollowCompanyUserDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserFollowCompanyUserDTO) =>
            c.companyUserName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
