import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvertCityDTO } from '../../../models/dto/companyUserAdvertCityDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserAdvertCityByUserPipe } from '../../../pipes/filterCompanyUserAdvertCityByUser.pipe';
import { CompanyUserAdvertCityService } from '../../../services/companyUserAdvertCity.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserAdvertCityDetailComponent } from '../companyUserAdvertCityDetail/companyUserAdvertCityDetail.component';
import { CompanyUserAdvertCityUpdateComponent } from '../companyUserAdvertCityUpdate/companyUserAdvertCityUpdate.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserAdvertCityDeletedList',
  templateUrl: './companyUserAdvertCityDeletedList.component.html',
  styleUrls: ['./companyUserAdvertCityDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserAdvertCityByUserPipe],
})
export class CompanyUserAdvertCityDeletedListComponent implements OnInit {
  companyUserAdvertCityDTOs: CompanyUserAdvertCityDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Company User Advert City Deleted List';

  constructor(
    private companyUserAdvertCityService: CompanyUserAdvertCityService,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService,
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
        this.getCompanyUserAdvertCities(response);
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

  getCompanyUserAdvertCities(adminModel: AdminModel) {
    this.companyUserAdvertCityService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserAdvertCityDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(companyUserAdvertCityDTO: CompanyUserAdvertCityDTO) {
    this.companyUserAdvertCityService
      .update(companyUserAdvertCityDTO)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success('Başarı ile geri alındı');
          this.ngOnInit();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  unDeleteAll() {
    this.companyUserAdvertCityDTOs.forEach((companyUserAdvertCityDTO) => {
      this.companyUserAdvertCityService
        .update(companyUserAdvertCityDTO)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(companyUserAdvertCityDTO: CompanyUserAdvertCityDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserAdvertCityService
      .terminate(companyUserAdvertCityDTO)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.toastrService.success('Başarı ile kalıcı olarak silindi');
          this.ngOnInit();
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserAdvertCityDTOs.forEach((companyUserAdvertCityDTO) => {
      this.companyUserAdvertCityService
        .terminate(companyUserAdvertCityDTO)
        .subscribe(
          (response) => {
            this.validationService.handleSuccesses(response);
          },
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
