import { ValidationService } from './../../services/validation.service';
import { LoginModel } from './../../models/auth/loginModel';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddToLocalStorageService } from '../../services/helperServices/addToLocalStorage.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  title: string = 'Please Login In';
  loginModel: LoginModel = {} as LoginModel;

  constructor(
    private autService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private addToLocalStorageService: AddToLocalStorageService,
    private validationService: ValidationService
  ) {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginModel: LoginModel = Object.assign({ id: '' }, form.value);

      this.autService.login(loginModel).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.addToLocalStorageService.addToken(response.data.token);
          this.addToLocalStorageService.addId(response.data.id);
          this.addToLocalStorageService.addFirstName(response.data.firstName);
          this.addToLocalStorageService.addLasttName(response.data.lastName);
          this.addToLocalStorageService.addEmail(response.data.email);
          this.addToLocalStorageService.addPhone(response.data.phoneNumber);
          this.addToLocalStorageService.addCode(response.data.code);
          this.addToLocalStorageService.addExpiration(
            response.data.expiration.toString()
          );
          this.addToLocalStorageService.addCreateDate(
            response.data.createdDate.toString()
          );
          this.addToLocalStorageService.addUpdateDate(
            response.data.updatedDate?.toString()
          );
          this.addToLocalStorageService.addDeletedDate(
            response.data.deletedDate?.toString()
          );
          this.addToLocalStorageService.addStatus(response.data.status);

          this.toastrService.success(
            'Sisteme Giriş Başarılı',
            'Hoşgeldiniz ' +
              response.data.firstName +
              ' ' +
              response.data.lastName
          );
          this.router.navigate(['dashboard']);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  register() {
    this.router.navigate(['register']);
  }

  emailClear() {
    this.loginModel.email = '';
  }
  passwordClear() {
    this.loginModel.password = '';
  }
}
