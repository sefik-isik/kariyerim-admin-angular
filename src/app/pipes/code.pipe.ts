import { Pipe, PipeTransform } from '@angular/core';
import { PersonelUserCode } from '../models/userCodes';
import { CompanyUserCode } from '../models/userCodes';

@Pipe({
  name: 'code',
})
export class CodePipe implements PipeTransform {
  transform(value: string): string {
    let result: string = '';
    if (value == PersonelUserCode) {
      result = 'Personel User';
    } else if (value == CompanyUserCode) {
      result = 'Company User';
    } else {
      result = 'Unknown User';
    }

    return result;
  }
}
