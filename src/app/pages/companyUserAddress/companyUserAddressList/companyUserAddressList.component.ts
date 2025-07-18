import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyUserAddressService } from '../../../services/companyUserAddress.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAddressDTO } from '../../../models/dto/companyUserAddressDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserAddressByUserPipe } from '../../../pipes/filterCompanyUserAddressByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserAddressDetailComponent } from '../companyUserAddressDetail/companyUserAddressDetail.component';
import { CompanyUserAddressUpdateComponent } from '../companyUserAddressUpdate/companyUserAddressUpdate.component';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserAddressList',
  templateUrl: './companyUserAddressList.component.html',
  styleUrls: ['./companyUserAddressList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserAddressByUserPipe],
})
export class CompanyUserAddressListComponent implements OnInit {
  userDTOs: UserDTO[] = [];
  companyUserAddressDTOs: CompanyUserAddressDTO[] = [];
  dataLoaded: boolean = false;
  filter1: string = '';
  filter2: string = '';
  componentTitle = 'Company User Addresses';
  admin: boolean = false;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
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
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
        this.getCompanyUserAddresses(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserAddresses(adminModel: AdminModel) {
    this.companyUserAddressService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserAddressDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(companyUserAddressDTO: CompanyUserAddressDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserAddressService.delete(companyUserAddressDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile silindi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserAddressDTOs.forEach((companyUserAddressDTO) => {
      this.companyUserAddressService.delete(companyUserAddressDTO).subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(companyUserAddressDTO: CompanyUserAddressDTO) {
    const modalRef = this.modalService.open(CompanyUserAddressUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserAddressDTO = companyUserAddressDTO;
  }

  openDetail(companyUserAddressDTO: CompanyUserAddressDTO) {
    const modalRef = this.modalService.open(CompanyUserAddressDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
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
