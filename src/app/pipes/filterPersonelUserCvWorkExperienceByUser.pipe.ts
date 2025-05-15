import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserCvWorkExperienceDTO } from '../models/personelUserCvWorkExperienceDTO';

@Pipe({
  name: 'filterPersonelUserCvWorkExperienceByUser',
})
export class FilterPersonelUserCvWorkExperienceByUserPipe
  implements PipeTransform
{
  transform(
    value: PersonelUserCvWorkExperienceDTO[],
    filterText: string
  ): PersonelUserCvWorkExperienceDTO[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: PersonelUserCvWorkExperienceDTO) =>
            c.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
