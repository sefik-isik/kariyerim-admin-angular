import { LocalStorageService } from '../../../services/localStorage.service';
import { CompanyUserAddressService } from '../../../services/companyUserAddress.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CompanyUserAddressDTO } from '../../../models/CompanyUserAddressDTO';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/userDTO';
import { FilterCompanyUserAddressByUserPipe } from '../../../pipes/filterCompanyUserAddressByUser.pipe';
import { AdminService } from '../../../services/admin.service';
import { AdminModel } from '../../../models/adminModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserAddressUpdateComponent } from '../companyUserAddressUpdate/companyUserAddressUpdate.component';
import { CompanyUserAddressDetailComponent } from '../companyUserAddressDetail/companyUserAddressDetail.component';

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
  componentTitle = 'Company User Addresses';
  userId: number;

  constructor(
    private companyUserAddressService: CompanyUserAddressService,
    private toastrService: ToastrService,
    private adminService: AdminService,
    private userService: UserService,
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
    const id = parseInt(this.localStorageService.getFromLocalStorage('id'));
    this.adminService.getAdminValues(id).subscribe(
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
    this.companyUserAddressService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserAddressDTOs = response.data;
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
