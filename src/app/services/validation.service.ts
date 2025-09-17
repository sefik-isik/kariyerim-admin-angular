import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private toastrService: ToastrService) {}

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

  handleErrors(responseError: any) {
    let errorNames: string[] = [];

    if (responseError.error.StatusCode == 500) {
      //console.clear();
      console.error(responseError);
      this.toastrService.error(
        `${responseError.error.StatusText}`,
        'Sistem Hatası'
      );
    }

    if (responseError.error.message && responseError.status == 400) {
      //console.clear();
      console.error(responseError);
      this.toastrService.error(`${responseError.error.message}`);
    }

    if (responseError.error.errors && responseError.error.status == 400) {
      //console.clear();
      console.error(responseError);
      for (let errorName in responseError.error.errors) {
        errorNames.push(errorName);
      }

      errorNames.forEach((e) => {
        this.toastrService.error(`${e} alanı boş olamaz.`);
      });
    }

    if (
      responseError.error.ValidationErrors &&
      responseError.error.StatusCode == 400
    ) {
      //console.clear();
      console.error(responseError);
      this.toastrService.error(
        responseError.error.StatusText,
        responseError.error.Message
      );

      responseError.error.ValidationErrors.forEach((e: any) => {
        //console.clear();
        console.error(
          `Alan Adı: ${e.PropertyName} | Girilen Değer: ${e.AttemptedValue} | Hata Mesajı : ${e.ErrorMessage}`
        );
        this.toastrService.error(`${e.ErrorMessage}`);
      });
    }
  }

  handleSuccesses(response: any) {
    if (response.message) {
      //console.clear();
      // console.info(
      //   'Message : ' + response.message + ' isSuccess : ' + response.isSuccess
      // );
    }
  }
}
