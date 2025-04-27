import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDepartmentDTO } from '../models/universityDepartmentDTO';

@Pipe({
  name: 'filterUniversityDepartment',
})
export class FilterUniversityDepartmentPipe implements PipeTransform {
  transform(
    value: UniversityDepartmentDTO[],
    filterText: string
  ): UniversityDepartmentDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDepartmentDTO) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
