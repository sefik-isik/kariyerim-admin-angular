import { CompanyUserDepartmentDTO } from '../../../models/dto/companyUserDepartmentDTO';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { FilterCompanyUserDepartmentByUserPipe } from '../../../pipes/filterCompanyUserDepartmentByUser.pipe';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/userDTO';
import { AdminService } from '../../../services/helperServices/admin.service';
import { AdminModel } from '../../../models/auth/adminModel';
import { LocalStorageService } from '../../../services/helperServices/localStorage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUserDepartmentUpdateComponent } from '../companyUserDepartmentUpdate/companyUserDepartmentUpdate.component';
import { CompanyUserDepartmentDetailComponent } from '../companyUserDepartmentDetail/companyUserDepartmentDetail.component';
import { AuthService } from '../../../services/auth.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-companyUserDepartmentList',
  templateUrl: './companyUserDepartmentList.component.html',
  styleUrls: ['./companyUserDepartmentList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserDepartmentByUserPipe],
})
export class CompanyUserDepartmentListComponent implements OnInit {
  companyUserDepartmentDTOs: CompanyUserDepartmentDTO[] = [];
  companyUserDepartmentDTO: CompanyUserDepartmentDTO;
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Company User Departments';

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
        this.validationService.handleSuccesses(response);
        this.getAllCompanyUsers(response);
        this.getCompanyUserDepartments(response);
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

  getCompanyUserDepartments(adminModel: AdminModel) {
    this.companyUserDepartmentService.getAllDTO(adminModel).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDepartmentDTOs = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  delete(companyUserDepartment: any) {
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.companyUserDepartmentService.delete(companyUserDepartment).subscribe(
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
    this.companyUserDepartmentDTOs.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService.delete(companyUserDepartment).subscribe(
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
