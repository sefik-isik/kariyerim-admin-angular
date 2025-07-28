import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  componentTitle = 'Please Register';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectUser(userType: string) {
    if (
      confirm(userType + ' Kullanıcı Kaydı Yapmak İstediğinize Emin Misiniz?')
    ) {
      if (userType === 'personel') {
        this.router.navigate(['registerPersonelUser']);
      } else if (userType === 'company') {
        this.router.navigate(['registerCompanyUser']);
      } else {
        this.router.navigate(['register']);
      }
    } else {
      this.router.navigate(['register']);
    }
  }
}
