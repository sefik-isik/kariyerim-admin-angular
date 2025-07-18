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
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserImageUpdateComponent } from '../companyUserImageUpdate/companyUserImageUpdate.component';
import { CompanyUserImageDetailComponent } from '../companyUserImageDetail/companyUserImageDetail.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserImageList',
  templateUrl: './companyUserImageList.component.html',
  styleUrls: ['./companyUserImageList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserImageByUserPipe],
})
export class CompanyUserImageListComponent implements OnInit {
  companyUserImageDTOs: CompanyUserImageDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Company User Images';

  constructor(
    private toastrService: ToastrService,
    private companyUserImageService: CompanyUserImageService,
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
    this.companyUserImageService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserImageDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  updateMainImage(companyUserImage: CompanyUserImageDTO) {
    if (!confirm('Ana Resim Olarak Güncellemek istediğinize emin misiniz?')) {
      this.toastrService.info('Güncelleme İşlemi İptal Edildi');
      return;
    }
    companyUserImage.isMainImage = true;
    this.companyUserImageService.update(companyUserImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile güncellendi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  updateLogoImage(companyUserImage: CompanyUserImageDTO) {
    if (!confirm('Logo Olarak Güncellemek istediğinize emin misiniz?')) {
      this.toastrService.info('Güncelleme İşlemi İptal Edildi');
      return;
    }
    companyUserImage.isLogo = true;
    this.companyUserImageService.update(companyUserImage).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile güncellendi');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(companyUserImage: CompanyUserImageDTO) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserImageService.delete(companyUserImage).subscribe(
      (response) => {
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
    this.companyUserImageDTOs.forEach((companyUserImage) => {
      this.companyUserImageService.delete(companyUserImage).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
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
