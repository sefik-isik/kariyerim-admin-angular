import { CompanyUserDepartmentDTO } from './../../../models/companyUserDepartmentDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterCompanyUserDepartmentByUserPipe } from '../../../pipes/filterCompanyUserDepartmentByUser.pipe';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';

import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { CompanyUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserDepartment',
  templateUrl: './companyUserDepartment.component.html',
  styleUrls: ['./companyUserDepartment.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserDepartmentByUserPipe,
  ],
})
export class CompanyUserDepartmentComponent implements OnInit {
  companyUserDepartmentDTOs: CompanyUserDepartmentDTO[] = [];
  companyUserDepartmentDTO: CompanyUserDepartmentDTO;
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  componentTitle = 'Company User Departments';
  userId: number;

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
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
  getCompanyUserDepartments() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserDepartmentService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUserDepartmentDTOs = response.data.filter(
          (f) => f.code == CompanyUserCode
        );
      },
      (error) => console.error
    );
  }

  delete(companyUserDepartment: any) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserDepartmentService.delete(companyUserDepartment).subscribe(
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
    this.companyUserDepartmentDTOs.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService.delete(companyUserDepartment).subscribe(
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
    this.getCompanyUserDepartments();
  }
}
