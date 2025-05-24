import { Pipe, PipeTransform } from '@angular/core';
import { DepartmentDetailDTO } from '../models/departmentDetailDTO';

@Pipe({
  name: 'filterDepartmentDetail',
})
export class FilterDepartmentDetailPipe implements PipeTransform {
  transform(
    value: DepartmentDetailDTO[],
    filterText: string
  ): DepartmentDetailDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: DepartmentDetailDTO) =>
            c.departmentName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
