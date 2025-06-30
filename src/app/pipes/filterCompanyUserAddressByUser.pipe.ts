import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserAddressDTO } from '../models/dto/companyUserAddressDTO';

@Pipe({
  name: 'filterCompanyUserAddressByUser',
})
export class FilterCompanyUserAddressByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserAddressDTO[],
    filterText: string
  ): CompanyUserAddressDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserAddressDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
