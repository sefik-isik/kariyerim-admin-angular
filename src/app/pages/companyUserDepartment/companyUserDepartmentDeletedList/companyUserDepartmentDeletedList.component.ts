import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyUserDepartment } from '../../../models/component/companyUserDepartment';
import { UserDTO } from '../../../models/dto/userDTO';
import { FilterCompanyUserDepartmentByUserPipe } from '../../../pipes/filterCompanyUserDepartmentByUser.pipe';
import { AuthService } from '../../../services/auth.service';
import { CompanyUserDepartmentService } from '../../../services/companyUserDepartment.service';
import { ValidationService } from '../../../services/validation.service';
import { CompanyUserDepartmentDetailComponent } from '../companyUserDepartmentDetail/companyUserDepartmentDetail.component';
import { CompanyUserDepartmentUpdateComponent } from '../companyUserDepartmentUpdate/companyUserDepartmentUpdate.component';

@Component({
  selector: 'app-companyUserDepartmentDeletedList',
  templateUrl: './companyUserDepartmentDeletedList.component.html',
  styleUrls: ['./companyUserDepartmentDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserDepartmentByUserPipe],
})
export class CompanyUserDepartmentDeletedListComponent implements OnInit {
  companyUserDepartments: CompanyUserDepartment[] = [];
  companyUserDepartment: CompanyUserDepartment;
  dataLoaded = false;
  userDTOs: UserDTO[] = [];
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Deleted Company User Departments';

  constructor(
    private companyUserDepartmentService: CompanyUserDepartmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getCompanyUserDepartments();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getCompanyUserDepartments();
      }
    });
  }

  getCompanyUserDepartments() {
    this.companyUserDepartmentService.getDeletedAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDepartments = response.data;
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDelete(companyUserDepartment: any) {
    this.companyUserDepartmentService.update(companyUserDepartment).subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.toastrService.success('Başarı ile geri alındı');
        this.ngOnInit();
      },
      (responseError) => this.validationService.handleErrors(responseError)
    );
  }

  unDeleteAll() {
    this.companyUserDepartments.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService.update(companyUserDepartment).subscribe(
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

  terminate(companyUserDepartment: CompanyUserDepartment) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.companyUserDepartmentService
      .terminate(companyUserDepartment)
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

    this.companyUserDepartments.forEach((companyUserDepartment) => {
      this.companyUserDepartmentService
        .terminate(companyUserDepartment)
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

  open(companyUserDepartment: CompanyUserDepartment) {
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
    modalRef.componentInstance.companyUserDepartment = companyUserDepartment;
  }

  openDetail(companyUserDepartment: CompanyUserDepartment) {
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
    modalRef.componentInstance.companyUserDepartment = companyUserDepartment;
  }

  clearInput1() {
    this.filter1 = null;
    this.getCompanyUserDepartments();
  }
}
