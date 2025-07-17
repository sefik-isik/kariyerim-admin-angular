import { Pipe, PipeTransform } from '@angular/core';
import { WorkArea } from '../models/component/workArea';

@Pipe({
  name: 'filterWorkArea',
})
export class FilterWorkAreaPipe implements PipeTransform {
  transform(value: WorkArea[], filterText: string): WorkArea[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: WorkArea) =>
            c.areaName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
