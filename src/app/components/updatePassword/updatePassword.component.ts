import { LocalStorageService } from '../../services/helperServices/localStorage.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordModel } from '../../models/auth/passwordModel';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-updatePassword',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UpdatePasswordComponent {
  title = 'Change Password';
  passwordModel: PasswordModel = {} as PasswordModel;

  constructor(
    private autService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private validationService: ValidationService
  ) {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const passwordModel: PasswordModel = Object.assign(
        {
          id: this.localStorageService.getFromLocalStorage('id'),
          firstName: this.localStorageService.getFromLocalStorage('firstName'),
          lastName: this.localStorageService.getFromLocalStorage('lastName'),
          email: this.localStorageService.getFromLocalStorage('email'),
          phoneNumber:
            this.localStorageService.getFromLocalStorage('phoneNumber'),
        },
        form.value
      );

      this.autService.updatePassword(passwordModel).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.localStorageService.clearLocalStorage();

          this.toastrService.success(
            'Lütfen Tekrar Giriş Yapınız',
            'Şifreniz Başarıyla Değiştirildi'
          );
          this.router.navigate(['login']);
        },
        (responseError) =>
          this.toastrService.error(responseError.error, 'Bir Hata Oluştu!') // Error handling
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }
}
