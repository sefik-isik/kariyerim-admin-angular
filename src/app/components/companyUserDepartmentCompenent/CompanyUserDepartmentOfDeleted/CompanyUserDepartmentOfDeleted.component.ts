import { LocalStorageService } from './../../../services/localStorage.service';
import { CompanyUserDepartmentDTO } from './../../../models/companyUserDepartmentDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterCompanyUserDepartmentByUserPipe } from '../../../pipes/filterCompanyUserDepartmentByUser.pipe';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';

import { UserDTO } from '../../../models/userDTO';
import { CompanyUserDTO } from '../../../models/companyUserDTO';
import { CompanyUserService } from '../../../services/companyUser.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-CompanyUserDepartmentOfDeleted',
  templateUrl: './CompanyUserDepartmentOfDeleted.component.html',
  styleUrls: ['./CompanyUserDepartmentOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserDepartmentByUserPipe,
  ],
})
export class CompanyUserDepartmentOfDeletedComponent implements OnInit {
  companyUserDepartmentDTOs: CompanyUserDepartmentDTO[] = [];
  companyUserDepartmentDTO: CompanyUserDepartmentDTO;
  dataLoaded = false;
  userDTOs: UserDTO[] = [];
  companyUserDTOs: CompanyUserDTO[] = [];
  filter1: string = '';
  componentTitle = 'Company User Departments Of Deleted';
  userId: number;

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private companyUserService: CompanyUserService
  ) {}

  ngOnInit() {
    this.getUsers();

    this.getCompanyUserDepartments();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data.filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getUserId(userEmail: string): number {
    const userId = this.userDTOs.filter((c) => c.email === userEmail)[0]?.id;

    return userId;
  }

  getCompanyUserDepartments() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserDepartmentService.getAllDeletedDTO(this.userId).subscribe(
      (response) => {
        this.companyUserDepartmentDTOs = response.data.filter(
          (f) => f.code == CompanyUserCode
        );
      },
      (error) => console.error
    );
  }

  unDelete(companyUserDepartment: any) {
    this.companyUserDepartmentService.update(companyUserDepartment).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserDepartmentDTOs.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService.update(companyUserDepartment).subscribe(
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
    this.getCompanyUserDepartments();
  }
}
