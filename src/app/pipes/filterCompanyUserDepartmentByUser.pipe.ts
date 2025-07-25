import { Pipe, PipeTransform } from '@angular/core';
import { CompanyUserDepartment } from '../models/component/companyUserDepartment';

@Pipe({
  name: 'filterCompanyUserDepartmentByUser',
})
export class FilterCompanyUserDepartmentByUserPipe implements PipeTransform {
  transform(
    value: CompanyUserDepartment[],
    filterText: string
  ): CompanyUserDepartment[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: CompanyUserDepartment) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
