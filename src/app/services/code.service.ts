import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { CompanyUserCode, PersonelUserCode } from '../models/userCodes';
import { AdminService } from './admin.service';
import { AdminModel } from '../models/adminModel';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  constructor(
    private router: Router,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
      (response) => {
        this.getCode(response);
      },
      (error) => console.error
    );
  }

  getCode(adminModel: AdminModel) {
    this.userService.getCode(adminModel).subscribe(
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
