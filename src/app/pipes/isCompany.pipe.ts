import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isCompany',
})
export class IsCompanyPipe implements PipeTransform {
  transform(value: boolean): string {
    let result: string = '';
    if (value == true) {
      result = 'Company';
    } else if (value == false) {
      result = 'Üniversity';
    }

    return result;
  }
}
