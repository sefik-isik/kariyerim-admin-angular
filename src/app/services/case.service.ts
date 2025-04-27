import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  capitalizeFirstLetter(str: string) {
    let strs: string[] = str.split(' ');
    let strText: string = '';

    strs.forEach((str) => {
      str = str.toLocaleLowerCase();
      str = str[0].toLocaleUpperCase() + str.slice(1);
      strText = strText + ' ' + str;
      strText = strText.trim();
    });
    return strText;
  }

  capitalizeToUpper(str: string) {
    return str.toLocaleUpperCase();
  }

  capitalizeToLower(str: string) {
    return str.toLocaleLowerCase();
  }
}
