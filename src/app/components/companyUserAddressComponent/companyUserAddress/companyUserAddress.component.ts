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
import { CompanyUserCode, PersonelUserCode } from '../../../models/userCodes';

@Component({
  selector: 'app-companyUserAddress',
  templateUrl: './companyUserAddress.component.html',
  styleUrls: ['./companyUserAddress.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    FilterCompanyUserAddressByUserPipe,
  ],
})
export class CompanyUserAddressComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserAddressDTOs: CompanyUserAddressDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  componentTitle = 'Company User Addresses';
  userId: number;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCompanyAddresses();
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

  getCompanyAddresses() {
    this.userId = parseInt(this.localStorageService.getFromLocalStorage('id'));

    this.companyUserAddressService.getAllDTO(this.userId).subscribe(
      (response) => {
        this.companyUserAddressDTOs = response.data
          .filter((f) => f.deletedDate == null)
          .filter((f) => f.code == CompanyUserCode);
        this.dataLoaded = true;
      },
      (error) => console.error
    );
  }

  delete(companyUserAddressDTO: CompanyUserAddressDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserAddressService.delete(companyUserAddressDTO).subscribe(
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
    this.companyUserAddressDTOs.forEach((companyUserAddressDTO) => {
      this.companyUserAddressService.delete(companyUserAddressDTO).subscribe(
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
    this.getCompanyAddresses();
  }
}
