import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CompanyUserFileDTO } from '../../../models/dto/companyUserFileDTO';
import { CompanyUserFileService } from '../../../services/companyUserFile.service';
import { FilterCompanyUserFileByUserPipe } from '../../../pipes/filterCompanyUserFileByUser.pipe';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserFileUpdateComponent } from '../companyUserFileUpdate/companyUserFileUpdate.component';
import { CompanyUserFileDetailComponent } from '../companyUserFileDetail/companyUserFileDetail.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserFileDeletedList',
  templateUrl: './companyUserFileDeletedList.component.html',
  styleUrls: ['./companyUserFileDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserFileByUserPipe],
})
export class CompanyUserFileDeletedListComponent implements OnInit {
  companyUserFileDTOs: CompanyUserFileDTO[] = [];
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Deleted Company User Files';

  constructor(
    private companyUserFileService: CompanyUserFileService,
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
        this.getCompanyUserFiles(response);
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

  getCompanyUserFiles(adminModel: AdminModel) {
    this.companyUserFileService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserFileDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(companyUserFileDTO: CompanyUserFileDTO) {
    this.companyUserFileService.update(companyUserFileDTO).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.companyUserFileDTOs.forEach((companyUserFileDTO) => {
      this.companyUserFileService.update(companyUserFileDTO).subscribe(
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

  terminate(companyUserFile: CompanyUserFileDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserFileService.terminate(companyUserFile).subscribe(
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

    this.companyUserFileDTOs.forEach((companyUserFile) => {
      this.companyUserFileService.terminate(companyUserFile).subscribe(
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

  open(companyUserFileDTO: CompanyUserFileDTO) {
    const modalRef = this.modalService.open(CompanyUserFileUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserFileDTO = companyUserFileDTO;
  }

  openDetail(companyUserFileDTO: CompanyUserFileDTO) {
    const modalRef = this.modalService.open(CompanyUserFileDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.companyUserFileDTO = companyUserFileDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
