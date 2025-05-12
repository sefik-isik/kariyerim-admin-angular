import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'private',
})
export class PrivatePipe implements PipeTransform {
  transform(value: boolean): string {
    let result: string = '';
    if (value == true) {
      result = 'Gizli';
    } else if (value == false) {
      result = 'Açık';
    }

    return result;
  }
}
