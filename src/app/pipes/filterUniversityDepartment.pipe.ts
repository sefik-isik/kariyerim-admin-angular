import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDepartment } from '../models/component/universitydepartment';

@Pipe({
  name: 'filterUniversityDepartment',
})
export class FilterUniversityDepartmentPipe implements PipeTransform {
  transform(
    value: UniversityDepartment[],
    filterText: string
  ): UniversityDepartment[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDepartment) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
