import { CompanyUserDepartmentDTO } from './../../../models/companyUserDepartmentDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterCompanyUserDepartmentByUserPipe } from '../../../pipes/filterCompanyUserDepartmentByUser.pipe';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';

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
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUserDepartments(response);
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

  getCompanyUserDepartments(adminModel: AdminModel) {
    this.companyUserDepartmentService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDepartmentDTOs = response.data;
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
    this.getAdminValues();
  }
}
