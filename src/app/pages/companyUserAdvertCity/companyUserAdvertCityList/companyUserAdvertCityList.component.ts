import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvertCityDTO } from '../../../models/dto/companyUserAdvertCityDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { CompanyUserAdvertCityService } from '../../../services/companyUserAdvertCity.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserAdvertCityDetailComponent } from '../companyUserAdvertCityDetail/companyUserAdvertCityDetail.component';
import { CompanyUserAdvertCityUpdateComponent } from '../companyUserAdvertCityUpdate/companyUserAdvertCityUpdate.component';
import { FilterCompanyUserAdvertCityByUserPipe } from '../../../pipes/filterCompanyUserAdvertCityByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserCode } from '../../../models/concrete/userCodes';

@Component({
  selector: 'app-companyUserAdvertCityList',
  templateUrl: './companyUserAdvertCityList.component.html',
  styleUrls: ['./companyUserAdvertCityList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserAdvertCityByUserPipe],
})
export class CompanyUserAdvertCityListComponent implements OnInit {
  companyUserAdvertCityDTOs: CompanyUserAdvertCityDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  isCompanyUser: boolean = true;
  admin: boolean = false;
  componentTitle = 'Company User Advert City Deleted List';

  constructor(
    private companyUserAdvertCityService: CompanyUserAdvertCityService,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getAdminValues();
    this.checkUserCode();

    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getAdminValues();
      }
    });
  }

  checkUserCode() {
    if (
      this.localStorageService.getFromLocalStorage('code') == CompanyUserCode
    ) {
      this.isCompanyUser = true;
    } else {
      this.isCompanyUser = false;
    }
  }

  getAdminValues() {
    const id = this.localStorageService.getFromLocalStorage('id');
    this.adminService.getAdminValues(id).subscribe(
      (response) => {
        this.getAllCompanyUsers(response);
        this.getCompanyUserAdvertCities(response);
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  getCompanyUserAdvertCities(adminModel: AdminModel) {
    this.companyUserAdvertCityService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserAdvertCityDTOs = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(companyUserAdvertCityDTO: CompanyUserAdvertCityDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserAdvertCityService
      .delete(companyUserAdvertCityDTO)
      .subscribe(
        (response) => {
          this.toastrService.success('Başarı ile silindi');
          this.ngOnInit();
        },
        (responseError) => this.toastrService.error(responseError.error.message)
      );
  }

  deleteAll() {
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserAdvertCityDTOs.forEach((companyUserAdvertCityDTO) => {
      this.companyUserAdvertCityService
        .delete(companyUserAdvertCityDTO)
        .subscribe(
          (response) => {},
          (responseError) =>
            this.toastrService.error(responseError.error.message)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(companyUserAdvertCityDTO: CompanyUserAdvertCityDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertCityUpdateComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.companyUserAdvertCityDTO =
      companyUserAdvertCityDTO;
  }

  openDetail(companyUserAdvertCityDTO: CompanyUserAdvertCityDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertCityDetailComponent,
      {
        size: 'lg',
        backdrop: 'static',
        keyboard: true,
        centered: true,
        scrollable: false,
        windowClass: 'modal-holder',
        backdropClass: 'modal-backdrop',
      }
    );
    modalRef.componentInstance.companyUserAdvertCityDTO =
      companyUserAdvertCityDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
