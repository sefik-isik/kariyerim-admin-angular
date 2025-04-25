import { Pipe, PipeTransform } from '@angular/core';
import { University } from '../models/university';

@Pipe({
  name: 'filterUniversity',
})
export class FilterUniversityPipe implements PipeTransform {
  transform(value: University[], filterText: string): University[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: University) =>
            c.universityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
