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
    private addToLocalStorageService: AddToLocalStorageService
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
      let registerModel: RegisterModel = Object.assign(
        {},
        this.registerForm.value
      );
      this.autService.register(registerModel).subscribe(
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
          this.router.navigate(['main']);
        },
        (error) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  login() {
    this.router.navigate(['login']);
  }
}
