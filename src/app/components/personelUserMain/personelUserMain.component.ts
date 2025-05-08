import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage.service';
import { Router } from '@angular/router';
import { CodeService } from '../../services/code.service';
import { AdminService } from '../../services/admin.service';
import { AdminModel } from '../../models/adminModel';

@Component({
  selector: 'app-personelUserMain',
  templateUrl: './personelUserMain.component.html',
  styleUrls: ['./personelUserMain.component.css'],
})
export class PersonelUserMainComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private codeService: CodeService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
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
