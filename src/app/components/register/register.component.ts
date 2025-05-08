import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/registerModel';
import { AddToLocalStorageService } from '../../services/addToLocalStorage.service';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  componentTitle = 'Please Register';

  constructor(
    private formBuilder: FormBuilder,
    private autService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private addToLocalStorageService: AddToLocalStorageService,
    private caseService: CaseService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.autService.register(this.getregisterModel()).subscribe(
        (response) => {
          this.addToLocalStorageService.addToken(response.data.token);
          this.addToLocalStorageService.addId(response.data.id.toString());
          this.addToLocalStorageService.addFirstName(response.data.firstName);
          this.addToLocalStorageService.addLasttName(response.data.lastName);
          this.addToLocalStorageService.addEmail(response.data.email);
          this.addToLocalStorageService.addPhone(response.data.phoneNumber);
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
        (error) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getregisterModel(): RegisterModel {
    let registerModel: RegisterModel = Object.assign(
      {
        email: this.caseService.capitalizeToLower(
          this.registerForm.get('email').value
        ),
        password: this.registerForm.get('password').value,
        firstName: this.caseService.capitalizeFirstLetter(
          this.registerForm.get('firstName').value
        ),
        lastName: this.caseService.capitalizeToUpper(
          this.registerForm.get('lastName').value
        ),
        phoneNumber: this.registerForm.get('phoneNumber').value,
      }
      //this.registerForm.value
    );
    return registerModel;
  }

  login() {
    this.router.navigate(['login']);
  }
}
