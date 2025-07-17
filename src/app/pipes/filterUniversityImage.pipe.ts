import { Pipe, PipeTransform } from '@angular/core';
import { UniversityImage } from '../models/component/universityImage';

@Pipe({
  name: 'filterUniversityImage',
})
export class FilterUniversityImagePipe implements PipeTransform {
  transform(value: UniversityImage[], filterText: string): UniversityImage[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityImage) =>
            c.imageOwnName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
