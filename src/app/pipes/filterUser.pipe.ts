import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserDTO } from '../models/dto/companyUserDTO';

@Pipe({
  name: 'filterUser',
})
export class FilterUserPipe implements PipeTransform {
  transform(value: CompanyUserDTO[], filterText: string): CompanyUserDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
