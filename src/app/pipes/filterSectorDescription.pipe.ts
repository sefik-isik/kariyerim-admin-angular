import { Pipe, PipeTransform } from '@angular/core';
import { SectorDescriptionDTO } from '../models/dto/sectorDescriptionDTO';

@Pipe({
  name: 'filterSectorDescription',
})
export class FilterSectorDescriptionPipe implements PipeTransform {
  transform(
    value: SectorDescriptionDTO[],
    filterText: string
  ): SectorDescriptionDTO[] {
    filterText =
      filterText && filterText.length > 0
        ? filterText.toLocaleLowerCase()
        : null;

    return filterText
      ? value.filter(
          (c: SectorDescriptionDTO) =>
            c.sectorName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : null;
  }
}
