import { CompanyUserDepartmentDTO } from '../../../models/dto/companyUserDepartmentDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { FilterCompanyUserDepartmentByUserPipe } from '../../../pipes/filterCompanyUserDepartmentByUser.pipe';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { UserService } from '../../../services/user.service';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDepartmentUpdateComponent } from '../companyUserDepartmentUpdate/companyUserDepartmentUpdate.component';
import { CompanyUserDepartmentDetailComponent } from '../companyUserDepartmentDetail/companyUserDepartmentDetail.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserDepartmentDeletedList',
  templateUrl: './companyUserDepartmentDeletedList.component.html',
  styleUrls: ['./companyUserDepartmentDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserDepartmentByUserPipe],
})
export class CompanyUserDepartmentDeletedListComponent implements OnInit {
  companyUserDepartmentDTOs: CompanyUserDepartmentDTO[] = [];
  companyUserDepartmentDTO: CompanyUserDepartmentDTO;
  dataLoaded = false;
  userDTOs: UserDTO[] = [];
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Deleted Company User Departments';

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
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
        this.getAllCompanyUsers(response);
        this.getCompanyUserDepartments(response);
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

  getCompanyUserDepartments(adminModel: AdminModel) {
    this.companyUserDepartmentService.getDeletedAllDTO(adminModel).subscribe(
      (response) => {
        this.companyUserDepartmentDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(companyUserDepartment: any) {
    this.companyUserDepartmentService.update(companyUserDepartment).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.companyUserDepartmentDTOs.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService.update(companyUserDepartment).subscribe(
        (response) => {},
        (responseError) => this.validationService.handleErrors(responseError)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(companyUserDepartment: CompanyUserDepartmentDTO) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDepartmentService
      .terminate(companyUserDepartment)
      .subscribe(
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

    this.companyUserDepartmentDTOs.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService
        .terminate(companyUserDepartment)
        .subscribe(
          (response) => {},
          (responseError) => this.validationService.handleErrors(responseError)
        );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
    }, 500);
  }

  open(companyUserDepartmentDTO: CompanyUserDepartmentDTO) {
    const modalRef = this.modalService.open(
      CompanyUserDepartmentUpdateComponent,
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
    modalRef.componentInstance.companyUserDepartmentDTO =
      companyUserDepartmentDTO;
  }

  openDetail(companyUserDepartmentDTO: CompanyUserDepartmentDTO) {
    const modalRef = this.modalService.open(
      CompanyUserDepartmentDetailComponent,
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
    modalRef.componentInstance.companyUserDepartmentDTO =
      companyUserDepartmentDTO;
  }

  clearInput1() {
    this.filter1 = null;
    this.getAdminValues();
  }
}
