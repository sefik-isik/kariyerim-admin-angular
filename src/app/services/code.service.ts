import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CompanyUserCode, PersonelUserCode } from '../models/userCodes';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  getCode() {
    let id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.userService.getCode(id).subscribe(
      (response) => {
        let code = response.data[0].code;
        this.checkCode(code);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  checkCode(code: string) {
    if (code === PersonelUserCode) {
      this.router.navigate(['/dashboard/main/personelusermain']);
    } else if (code === CompanyUserCode) {
      this.router.navigate(['/dashboard/main/companyusermain']);
    } else {
      this.router.navigate(['/dashboard/main']);
    }
  }
}
