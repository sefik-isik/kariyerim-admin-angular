import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { AdminService } from '../../../services/helperServices/admin.service';
import { FilterCompanyUserImageByUserPipe } from '../../../pipes/filterCompanyUserImageByUser.pipe';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserImageDTO } from '../../../models/dto/companyUserImageDTO';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { CompanyUserImageService } from '../../../services/companyUserImage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserImageUpdateComponent } from '../companyUserImageUpdate/companyUserImageUpdate.component';
import { CompanyUserImageDetailComponent } from '../companyUserImageDetail/companyUserImageDetail.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserImageDeletedList',
  templateUrl: './companyUserImageDeletedList.component.html',
  styleUrls: ['./companyUserImageDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserImageByUserPipe],
})
export class CompanyUserImageDeletedListComponent implements OnInit {
  companyUserImageDTOs: CompanyUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Deleted Company User Images';

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
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
        this.getAllCompanyUsers(response);
        this.getCompanyUserImages(response);
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getAllCompanyUsers(adminModel: AdminModel) {
    this.userService.getAllCompanyUserDTO(adminModel).subscribe(
      (response) => {
        this.userDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  getCompanyUserImages(adminModel: AdminModel) {
    this.companyUserImageService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(companyUserImageDTO: CompanyUserImageDTO) {
    this.companyUserImageService.update(companyUserImageDTO).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.companyUserImageDTOs.forEach((companyUserImageDTO) => {
      this.companyUserImageService.update(companyUserImageDTO).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(companyUserImage: CompanyUserImageDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserImageService.terminate(companyUserImage).subscribe(
      (response) => {
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

    this.companyUserImageDTOs.forEach((companyUserImage) => {
      this.companyUserImageService.terminate(companyUserImage).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(companyUserImageDTO: CompanyUserImageDTO) {
    const modalRef = this.modalService.open(CompanyUserImageUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserImageDTO = companyUserImageDTO;
  }

  openDetail(companyUserImageDTO: CompanyUserImageDTO) {
    const modalRef = this.modalService.open(CompanyUserImageDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserImageDTO = companyUserImageDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
