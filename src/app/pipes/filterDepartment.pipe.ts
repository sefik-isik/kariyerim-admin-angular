import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../models/component/department';

@Pipe({
  name: 'filterDepartment',
})
export class FilterDepartmentPipe implements PipeTransform {
  transform(value: Department[], filterText: string): Department[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Department) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
