import { CompanyUserService } from './../../../services/companyUser.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CompanyUserDTO } from '../../../models/companyUserDTO';

import { UserDTO } from '../../../models/userDTO';
import { FilterUserPipe } from '../../../pipes/filterUser.pipe';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-companyUserOfDeleted',
  templateUrl: './companyUserOfDeleted.component.html',
  styleUrls: ['./companyUserOfDeleted.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, FilterUserPipe],
})
export class CompanyUserOfDeletedComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  dataLoaded = false;
  filter1 = '';

  componentTitle = 'Deleted Company Users';
  userId: number;

  constructor(
    private userService: UserService,
    private companyUserService: CompanyUserService,
    private toastrService: ToastrService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
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
    this.companyUserService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDTOs = response.data;
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.find((c) => c.email === userEmail)?.id;

    return userId;
  }

  unDelete(companyUser: CompanyUserDTO) {
    this.companyUserService.update(companyUser).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserDTOs.forEach((companyUser) => {
      this.companyUserService.update(companyUser).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clearInput1() {
    this.filter1 = null;
    this.ngOnInit();
  }
}
