import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/localStorage.service';
import { Router } from '@angular/router';
import { CodeService } from '../../../services/code.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-companyUserMain',
  templateUrl: './companyUserMain.component.html',
  styleUrls: ['./companyUserMain.component.css'],
})
export class CompanyUserMainComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private adminService: AdminService,
    private codeService: CodeService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getCode(response);
      },
      (error) => console.error
    );
  }

  getCode(adminModel: AdminModel) {
    if (this.localStorageService.getFromLocalStorage('id') == null) {
      this.router.navigate(['login']);
    } else {
      this.codeService.getCode(adminModel);
    }
  }
}
