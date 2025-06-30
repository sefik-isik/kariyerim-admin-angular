import { Pipe, PipeTransform } from '@angular/core';
import { DepartmentDescriptionDTO } from '../models/dto/departmentDescriptionDTO';

@Pipe({
  name: 'filterDepartmentDescription',
})
export class FilterDepartmentDescriptionPipe implements PipeTransform {
  transform(
    value: DepartmentDescriptionDTO[],
    filterText: string
  ): DepartmentDescriptionDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: DepartmentDescriptionDTO) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
