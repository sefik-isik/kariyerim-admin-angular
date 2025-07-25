import { Pipe, PipeTransform } from '@angular/core';
import { UniversityFaculty } from '../models/component/universityFaculty';

@Pipe({
  name: 'filterUniversityFaculty',
})
export class FilterUniversityFacultyPipe implements PipeTransform {
  transform(
    value: UniversityFaculty[],
    filterText: string
  ): UniversityFaculty[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityFaculty) =>
            c.facultyName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
