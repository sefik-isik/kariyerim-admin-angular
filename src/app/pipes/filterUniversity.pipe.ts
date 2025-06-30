import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDTO } from '../models/dto/universityDTO';

@Pipe({
  name: 'filterUniversity',
})
export class FilterUniversityPipe implements PipeTransform {
  transform(value: UniversityDTO[], filterText: string): UniversityDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDTO) =>
            c.universityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
