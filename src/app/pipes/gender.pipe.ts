import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: boolean): string {
    let result: string = '';
    if (value == true) {
      result = 'Erkek';
    } else if (value == false) {
      result = 'Kadın';
    }

    return result;
  }
}
