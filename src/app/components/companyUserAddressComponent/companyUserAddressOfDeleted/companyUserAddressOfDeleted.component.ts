import { AdminService } from './../../../services/admin.service';
import { CompanyUserAddressService } from './../../../services/companyUserAddress.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserAddressDTO } from '../../../models/CompanyUserAddressDTO';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterCompanyUserAddressByUserPipe } from '../../../pipes/filterCompanyUserAddressByUser.pipe';
import { AdminModel } from '../../../models/adminModel';

@Component({
  selector: 'app-companyUserAddressOfDeleted',
  templateUrl: './companyUserAddressOfDeleted.component.html',
  styleUrls: ['./companyUserAddressOfDeleted.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserAddressByUserPipe,
  ],
})
export class CompanyUserAddressOfDeletedComponent implements OnInit {
  companyUserAddressDTOs: CompanyUserAddressDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Deleted Company User Addresses';
  userId: number;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getAdminValues();
  }

  getAdminValues() {
    this.adminService.getAdminValues().subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUserAddresses(response);
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

  getCompanyUserAddresses(adminModel: AdminModel) {
    this.companyUserAddressService.getAllDeletedDTO(adminModel).subscribe(
      (response) => {
        this.companyUserAddressDTOs = response.data;
      },
      (error) => console.error
    );
  }

  unDelete(companyUserAddressDTO: CompanyUserAddressDTO) {
    this.companyUserAddressService.update(companyUserAddressDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (error) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserAddressDTOs.forEach((companyUserAddressDTO) => {
      this.companyUserAddressService.update(companyUserAddressDTO).subscribe(
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
