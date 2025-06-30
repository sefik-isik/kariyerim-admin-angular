import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDepartmentDTO } from '../models/dto/universityDepartmentDTO';

@Pipe({
  name: 'filterUniversityDepartmentsByUniversity',
})
export class FilterUniversityDepartmentsByUniversityPipe
  implements PipeTransform
{
  transform(
    value: UniversityDepartmentDTO[],
    filterText: string
  ): UniversityDepartmentDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDepartmentDTO) =>
            c.universityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
