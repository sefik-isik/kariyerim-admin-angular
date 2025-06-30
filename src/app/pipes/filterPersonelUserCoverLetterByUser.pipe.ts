import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserCoverLetter } from '../models/component/personelUserCoverLetter';

@Pipe({
  name: 'filterPersonelUserCoverLetterByUser',
})
export class FilterPersonelUserCoverLetterByUserPipe implements PipeTransform {
  transform(
    value: PersonelUserCoverLetter[],
    filterText: string
  ): PersonelUserCoverLetter[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserCoverLetter) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
