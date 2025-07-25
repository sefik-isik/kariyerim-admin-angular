import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDepartmentDescriptionDTO } from '../models/dto/universityDepartmentDescriptionDTO';

@Pipe({
  name: 'filterUniversityDepartmentDescription',
})
export class FilterUniversityDepartmentDescriptiontPipe
  implements PipeTransform
{
  transform(
    value: UniversityDepartmentDescriptionDTO[],
    filterText: string
  ): UniversityDepartmentDescriptionDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDepartmentDescriptionDTO) =>
            c.universityDepartmentName
              .toLocaleLowerCase()
              .indexOf(filterText) !== -1
        )
      : value;
  }
}
