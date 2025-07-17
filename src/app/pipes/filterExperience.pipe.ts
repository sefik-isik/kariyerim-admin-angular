import { Pipe, PipeTransform } from '@angular/core';
import { Experience } from '../models/component/experience';

@Pipe({
  name: 'filterExperience',
})
export class FilterExperiencePipe implements PipeTransform {
  transform(value: Experience[], filterText: string): Experience[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Experience) =>
            c.experienceName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
