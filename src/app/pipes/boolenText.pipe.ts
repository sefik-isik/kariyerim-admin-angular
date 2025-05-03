import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolenText',
})
export class BoolenTextPipe implements PipeTransform {
  transform(value: boolean): string {
    let result: string = '';
    if (value == true) {
      result = 'Evet';
    } else if (value == false) {
      result = 'Hayır';
    }

    return result;
  }
}
