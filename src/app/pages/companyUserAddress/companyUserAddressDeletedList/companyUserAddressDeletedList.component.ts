import { AdminService } from '../../../services/helperServices/admin.service';
import { CompanyUserAddressService } from '../../../services/companyUserAddress.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CompanyUserAddressDTO } from '../../../models/dto/companyUserAddressDTO';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserAddressByUserPipe } from '../../../pipes/filterCompanyUserAddressByUser.pipe';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAddressUpdateComponent } from '../companyUserAddressUpdate/companyUserAddressUpdate.component';
import { CompanyUserAddressDetailComponent } from '../companyUserAddressDetail/companyUserAddressDetail.component';

@Component({
  selector: 'app-companyUserAddressDeletedList',
  templateUrl: './companyUserAddressDeletedList.component.html',
  styleUrls: ['./companyUserAddressDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserAddressByUserPipe],
})
export class CompanyUserAddressDeletedListComponent implements OnInit {
  companyUserAddressDTOs: CompanyUserAddressDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';

  componentTitle = 'Deleted Company User Addresses';
  userId: string;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getAdminValues();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUserAddresses(response);
      },
      (responseError) => console.error
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  getCompanyUserAddresses(adminModel: AdminModel) {
    this.companyUserAddressService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserAddressDTOs = response.data;
      },
      (responseError) => console.error
    );
  }

  unDelete(companyUserAddressDTO: CompanyUserAddressDTO) {
    this.companyUserAddressService.update(companyUserAddressDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => console.error
    );
  }

  unDeleteAll() {
    this.companyUserAddressDTOs.forEach((companyUserAddressDTO) => {
      this.companyUserAddressService.update(companyUserAddressDTO).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(companyUserAddress: CompanyUserAddressDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserAddressService.terminate(companyUserAddress).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserAddressDTOs.forEach((companyUserAddress) => {
      this.companyUserAddressService.terminate(companyUserAddress).subscribe(
        (response) => {},
        (responseError) => console.error
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(companyUserAddressDTO: CompanyUserAddressDTO) {
    const modalRef = this.modalService.open(CompanyUserAddressUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserAddressDTO = companyUserAddressDTO;
  }

  openDetail(companyUserAddressDTO: CompanyUserAddressDTO) {
    const modalRef = this.modalService.open(CompanyUserAddressDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserAddressDTO = companyUserAddressDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
