import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminModel } from '../../../models/auth/adminModel';
import { CompanyUserAdvertJobDescriptionDTO } from '../../../models/dto/companyUserAdvertJobDescriptionDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserAdvertJobDescriptionByUserPipe } from '../../../pipes/filterCompanyUserAdvertJobDescriptionByUser.pipe';
import { CompanyUserAdvertJobDescriptionService } from '../../../services/companyUserAdvertJobDescription.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { UserService } from '../../../services/user.service';
import { CompanyUserAdvertJobDescriptionDetailComponent } from '../companyUserAdvertJobDescriptionDetail/companyUserAdvertJobDescriptionDetail.component';
import { CompanyUserAdvertJobDescriptionUpdateComponent } from '../companyUserAdvertJobDescriptionUpdate/companyUserAdvertJobDescriptionUpdate.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUser } from '../../../models/component/companyUser';
import { CompanyUserService } from '../../../services/companyUser.service';

@Component({
  selector: 'app-companyUserAdvertJobDescriptionDeletedList',
  templateUrl: './companyUserAdvertJobDescriptionDeletedList.component.html',
  styleUrls: ['./companyUserAdvertJobDescriptionDeletedList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterCompanyUserAdvertJobDescriptionByUserPipe,
  ],
})
export class CompanyUserAdvertJobDescriptionDeletedListComponent
  implements OnInit
{
  companyUserAdvertJobDescriptionDTOs: CompanyUserAdvertJobDescriptionDTO[] =
    [];
  userDTOs: UserDTO[] = [];
  companyUsers: CompanyUser[] = [];
  dataLoaded = false;
  filter1: string = '';
  filter2: string = '';
  admin: boolean = false;
  componentTitle = 'Company User Advert Job Description Deleted List';

  constructor(
    private companyUserAdvertJobDescriptionService: CompanyUserAdvertJobDescriptionService,
    private companyUserService: CompanyUserService,
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
        this.getCompanyUsers(response);
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

  getCompanyUsers(adminModel: AdminModel) {
    this.companyUserService.getAll(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUsers = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserAdvertCities(adminModel: AdminModel) {
    this.companyUserAdvertJobDescriptionService
      .getDeletedAllDTO(adminModel)
      .subscribe(
        (response) => {
          this.validationService.handleSuccesses(response);
          this.companyUserAdvertJobDescriptionDTOs = response.data;
        },
        (responseError) => this.validationService.handleErrors(responseError)
      );
  }

  unDelete(
    companyUserAdvertJobDescriptionDTO: CompanyUserAdvertJobDescriptionDTO
  ) {
    this.companyUserAdvertJobDescriptionService
      .update(companyUserAdvertJobDescriptionDTO)
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
    this.companyUserAdvertJobDescriptionDTOs.forEach(
      (companyUserAdvertJobDescriptionDTO) => {
        this.companyUserAdvertJobDescriptionService
          .update(companyUserAdvertJobDescriptionDTO)
          .subscribe(
            (response) => {
              this.validationService.handleSuccesses(response);
            },
            (responseError) =>
              this.validationService.handleErrors(responseError)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(
    companyUserAdvertJobDescriptionDTO: CompanyUserAdvertJobDescriptionDTO
  ) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserAdvertJobDescriptionService
      .terminate(companyUserAdvertJobDescriptionDTO)
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

    this.companyUserAdvertJobDescriptionDTOs.forEach(
      (companyUserAdvertJobDescriptionDTO) => {
        this.companyUserAdvertJobDescriptionService
          .terminate(companyUserAdvertJobDescriptionDTO)
          .subscribe(
            (response) => {
              this.validationService.handleSuccesses(response);
            },
            (responseError) =>
              this.validationService.handleErrors(responseError)
          );
      }
    );
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(companyUserAdvertJobDescriptionDTO: CompanyUserAdvertJobDescriptionDTO) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertJobDescriptionUpdateComponent,
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
    modalRef.componentInstance.companyUserAdvertJobDescriptionDTO =
      companyUserAdvertJobDescriptionDTO;
  }

  openDetail(
    companyUserAdvertJobDescriptionDTO: CompanyUserAdvertJobDescriptionDTO
  ) {
    const modalRef = this.modalService.open(
      CompanyUserAdvertJobDescriptionDetailComponent,
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
    modalRef.componentInstance.companyUserAdvertJobDescriptionDTO =
      companyUserAdvertJobDescriptionDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }

  clearInput2() {
    this.filter2 = null;
    this.getAdminValues();
  }
}
