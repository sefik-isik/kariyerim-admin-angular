import { LocalStorageService } from '../../services/localStorage.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordModel } from '../../models/passwordModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatePassword',
  templateUrl: './updatePassword.component.html',
  styleUrls: ['./updatePassword.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;

  componentTitle = 'Change Password';
  passwordModel: PasswordModel;

  constructor(
    private formBuilder: FormBuilder,
    private autService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createupdatePasswordForm();
  }

  createupdatePasswordForm() {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      this.autService.updatePassword(this.getModel()).subscribe(
        (response) => {
          this.localStorageService.clearLocalStorage();

          this.toastrService.success(
            'Lütfen Tekrar Giriş Yapınız',
            'Şifreniz Başarıyla Değiştirildi'
          );
          this.router.navigate(['login']);
        },
        (error) => console.error
      );
    } else {
      this.toastrService.error('Lütfen Formunuzu Kontrol Ediniz');
    }
  }

  getModel() {
    let updatePasswordModel: PasswordModel = Object.assign(
      {
        id: this.localStorageService.getFromLocalStorage('id'),
      },
      this.updatePasswordForm.value
    );
    return updatePasswordModel;
  }
}
