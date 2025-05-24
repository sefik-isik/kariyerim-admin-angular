import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDepartmentDTO } from '../models/universityDepartmentDTO';

@Pipe({
  name: 'filterUniversityFaculty',
})
export class FilterUniversityFacultyPipe implements PipeTransform {
  transform(
    value: UniversityDepartmentDTO[],
    filterText: string
  ): UniversityDepartmentDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDepartmentDTO) =>
            c.facultyName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
