import { AdminModel } from './../../../models/adminModel';
import { AdminService } from './../../../services/admin.service';
import { LocalStorageService } from './../../../services/localStorage.service';
import { FilterCompanyUserImageByUserPipe } from '../../../pipes/filterCompanyUserImageByUser.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CompanyUserImageDTO } from '../../../models/companyUserImageDTO';
import { UserDTO } from '../../../models/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';

@Component({
  selector: 'app-companyUserImageOfDeleted',
  templateUrl: './companyUserImageOfDeleted.component.html',
  styleUrls: ['./companyUserImageOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserImageByUserPipe,
  ],
})
export class CompanyUserImageOfDeletedComponent implements OnInit {
  companyUserImageDTOs: CompanyUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Company User Images Of Deleted';
  userId: number;
  companyUserImagesLenght: number = 0;

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
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
        this.getCompanyUserImages(response);
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

  getCompanyUserImages(adminModel: AdminModel) {
    this.companyUserImageService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data;
        this.companyUserImagesLenght = this.companyUserImageDTOs.length;
      },
      (error) => console.error
    );
  }

  unDelete(companyUserImageDTO: CompanyUserImageDTO) {
    this.companyUserImageService.update(companyUserImageDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserImageDTOs.forEach((companyUserImageDTO) => {
      this.companyUserImageService.update(companyUserImageDTO).subscribe(
        (response) => {},
        (error) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  clear1Input1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
