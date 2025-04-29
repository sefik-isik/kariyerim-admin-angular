import { CompanyUserAddressService } from './../../../services/companyUserAddress.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserAddressDTO } from '../../../models/CompanyUserAddressDTO';
import { LocalStorageService } from '../../../services/localStorage.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterCompanyUserAddressByUserPipe } from '../../../pipes/filterCompanyUserAddressByUser.pipe';
import { CompanyUserCode } from '../../../models/userCodes';

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
  componentTitle = 'Company User Addresses Of Deleted';
  userId: number;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyUserAddresses();
  }

  getUsers() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.userService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.userDTOs = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
      },
      (error) => console.error
    );
  }

  getCompanyUserAddresses() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserAddressService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUserAddressDTOs = response.data
          .filter((f) => f.deletedDate != null)
          .filter((f) => f.code == CompanyUserCode);
        this.dataLoaded = true;
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
    this.getCompanyUserAddresses();
  }
}
