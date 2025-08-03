import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDepartmentDescriptionDTO } from './../models/dto/universityDepartmentDescriptionDTO';

@Pipe({
  name: 'filterUniversityDepartmentDescription',
})
export class FilterUniversityDepartmentDescriptionPipe
  implements PipeTransform
{
  transform(
    value: UniversityDepartmentDescriptionDTO[],
    filterText: string
  ): UniversityDepartmentDescriptionDTO[] {
    filterText =
      filterText && filterText.length > 0
        ? filterText.toLocaleLowerCase()
        : null;

    return filterText
      ? value.filter(
          (c: UniversityDepartmentDescriptionDTO) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : null;
  }
}
