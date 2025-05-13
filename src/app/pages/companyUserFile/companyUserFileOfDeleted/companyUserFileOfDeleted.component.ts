import { LocalStorageService } from './../../../services/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserFileDTO } from '../../../models/companyUserFileDTO';
import { CompanyUserFileService } from '../../../services/companyUserFile.service';
import { FilterCompanyUserFileByUserPipe } from '../../../pipes/filterCompanyUserFileByUser.pipe';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-companyUserFileOfDeleted',
  templateUrl: './companyUserFileOfDeleted.component.html',
  styleUrls: ['./companyUserFileOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserFileByUserPipe,
  ],
})
export class CompanyUserFileOfDeletedComponent implements OnInit {
  companyUserFileDTOs: CompanyUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Deleted Company User Files';
  userId: number;

  constructor(
    private companyUserFileService: CompanyUserFileService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
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
        this.getCompanyUserFiles(response);
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

  getCompanyUserFiles(adminModel: AdminModel) {
    this.companyUserFileService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.companyUserFileDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(companyUserFileDTO: CompanyUserFileDTO) {
    this.companyUserFileService.update(companyUserFileDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserFileDTOs.forEach((companyUserFileDTO) => {
      this.companyUserFileService.update(companyUserFileDTO).subscribe(
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
    this.getAdminValues();
  }
}
