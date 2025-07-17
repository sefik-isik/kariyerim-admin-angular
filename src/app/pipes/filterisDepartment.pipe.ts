import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../models/component/department';

@Pipe({
  name: 'filterisDepartment',
})
export class FilterisDepartmentPipe implements PipeTransform {
  transform(value: Department[], filterText: boolean): Department[] {
    return filterText
      ? value.filter((c: Department) => c.isCompany === true)
      : value.filter((c: Department) => c.isCompany === false);
  }
}
