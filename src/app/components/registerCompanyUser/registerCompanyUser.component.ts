import { CaseService } from './../../services/helperServices/case.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth/registerModel';
import { AddToLocalStorageService } from '../../services/helperServices/addToLocalStorage.service';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-registerCompanyUser',
  templateUrl: './registerCompanyUser.component.html',
  styleUrls: ['./registerCompanyUser.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegisterCompanyUserComponent {
  title = 'Register Company User';
  registerModel: RegisterModel = {} as RegisterModel;

  constructor(
    private autService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private addToLocalStorageService: AddToLocalStorageService,
    private validationService: ValidationService,
    private caseService: CaseService
  ) {}

  getValidationErrors(state: any) {
    return this.validationService.getValidationErrors(state);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const registerModel: RegisterModel = Object.assign(
        {
          id: '',
          code: 'company',
          firstName: this.caseService.capitalizeFirstLetter(
            form.value.firstName
          ),
          lastName: this.caseService.capitalizeToUpper(form.value.lastName),
          email: this.caseService.capitalizeToLower(form.value.email),
        },
        form.value
      );
      this.autService.register(registerModel).subscribe(
        (response) => {
          this.addToLocalStorageService.addToken(response.data.token);
          this.addToLocalStorageService.addId(response.data.id.toString());
          this.addToLocalStorageService.addFirstName(response.data.firstName);
          this.addToLocalStorageService.addLasttName(response.data.lastName);
          this.addToLocalStorageService.addEmail(response.data.email);
          this.addToLocalStorageService.addPhone(response.data.phoneNumber);
          this.addToLocalStorageService.addCode(response.data.code);
          this.addToLocalStorageService.addCreateDate(
            response.data.createdDate.toString()
          );
          this.addToLocalStorageService.addUpdateDate(
            response.data.updatedDate?.toString()
          );
          this.addToLocalStorageService.addDeletedDate(
            response.data.deletedDate?.toString()
          );
          this.addToLocalStorageService.addStatus(
            response.data.status.toString()
          );

          response.data.firstName;
          this.toastrService.success(
            'Kayıt Başarıyla Oluşturuldu',
            'Hoşgeldiniz ' +
              response.data.firstName +
              ' ' +
              response.data.lastName
          );
          this.router.navigate(['/dashboard/main']);
        },
        (responseError) => console.log(responseError)
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  emailClear() {
    this.registerModel.email = '';
  }
  passwordClear() {
    this.registerModel.password = '';
  }
  firstNameClear() {
    this.registerModel.firstName = '';
  }
  lastNameClear() {
    this.registerModel.lastName = '';
  }
  phoneNumberClear() {
    this.registerModel.phoneNumber = '';
  }
}
