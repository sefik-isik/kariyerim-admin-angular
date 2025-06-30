import { Pipe, PipeTransform } from '@angular/core';
import { Faculty } from '../models/component/faculty';

@Pipe({
  name: 'filterFaculty',
})
export class FilterFacultyPipe implements PipeTransform {
  transform(value: Faculty[], filterText: string): Faculty[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Faculty) =>
            c.facultyName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
