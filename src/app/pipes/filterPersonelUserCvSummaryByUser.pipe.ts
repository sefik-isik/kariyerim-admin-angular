import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserCvSummaryDTO } from '../models/dto/personelUserCvSummaryDTO';

@Pipe({
  name: 'filterPersonelUserCvSummaryByUser',
})
export class FilterPersonelUserCvSummaryByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserCvSummaryDTO[],
    filterText: string
  ): PersonelUserCvSummaryDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserCvSummaryDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
