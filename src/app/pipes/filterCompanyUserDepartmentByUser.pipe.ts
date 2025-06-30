import { Pipe, PipeTransform } from '@angular/core';

import { CompanyUserDepartmentDTO } from '../models/dto/companyUserDepartmentDTO';

@Pipe({
  name: 'filterCompanyUserDepartmentByUser',
})
export class FilterCompanyUserDepartmentByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserDepartmentDTO[],
    filterText: string
  ): CompanyUserDepartmentDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserDepartmentDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
