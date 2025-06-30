import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  getValidationErrors(state: any) {
    let ctrlNamme: string = state.name;
    let message: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case 'required':
            message.push(ctrlNamme + ' alanı zorunludur.');
            break;
          case 'minlength':
            message.push(
              ctrlNamme +
                ' alanı en az ' +
                state.errors['minlength'].requiredLength +
                ' karakter olmalıdır.'
            );
            break;
          case 'maxlength':
            message.push(
              ctrlNamme +
                ' alanı en fazla ' +
                state.errors['maxlength'].requiredLength +
                ' karakter olmalıdır.'
            );
            break;
          case 'email':
            message.push(
              ctrlNamme + ' alanı geçerli bir e-posta adresi olmalıdır.'
            );
            break;
          case 'pattern':
            message.push(ctrlNamme + ' alanı geçerli bir formatta olmalıdır.');
            break;
          case 'min':
            message.push(
              ctrlNamme +
                ' alanı en az ' +
                state.errors['min'].min +
                ' değerine sahip olmalıdır.'
            );
            break;
          case 'max':
            message.push(
              ctrlNamme +
                ' alanı en fazla ' +
                state.errors['max'].max +
                ' değerine sahip olmalıdır.'
            );
            break;
          case 'customError':
            message.push(
              ctrlNamme + ' alanı özel bir hata mesajı içermektedir.'
            );
            break;
          default:
            message.push(ctrlNamme + ' alanında bilinmeyen bir hata oluştu.');
            break;
        }
      }
    }
    return message;
  }
}
