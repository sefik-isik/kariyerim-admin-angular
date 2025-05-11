import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserService } from '../../../services/companyUser.service';

import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { CompanyUser } from '../../../models/companyUser';

import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { LocalStorageService } from '../../../services/localStorage.service';

@Component({
  selector: 'app-companyUser',
  templateUrl: './companyUser.component.html',
  styleUrls: ['./companyUser.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterUserPipe],
})
export class CompanyUserComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';

  componentTitle = 'Company Users';
  userId: number;

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUsers(response);
      },
      (error) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  delete(companyUser: CompanyUser) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserService.delete(companyUser).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.delete(companyUser).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
