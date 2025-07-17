import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullDateFormat',
})
export class NullDateFormatPipe implements PipeTransform {
  transform(value: string): string {
    let result: string = '';
    if (value == '31/12/1899') {
      result = '-';
    } else {
      result = value;
    }

    return result;
  }
}
