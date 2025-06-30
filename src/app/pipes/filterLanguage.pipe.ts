import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../models/component/language';

@Pipe({
  name: 'filterLanguage',
})
export class FilterLanguagePipe implements PipeTransform {
  transform(value: Language[], filterText: string): Language[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c: Language) =>
            c.languageName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
