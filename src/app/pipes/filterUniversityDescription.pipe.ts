import { Pipe, PipeTransform } from '@angular/core';
import { UniversityDescriptionDTO } from '../models/dto/universityDescriptionDTO';

@Pipe({
  name: 'filterUniversityDescription',
})
export class FilterUniversityDescriptionPipe implements PipeTransform {
  transform(
    value: UniversityDescriptionDTO[],
    filterText: string
  ): UniversityDescriptionDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: UniversityDescriptionDTO) =>
            c.universityName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
