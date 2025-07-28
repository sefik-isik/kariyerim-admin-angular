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
  selector: 'app-companyUserDepartmentList',
  templateUrl: './companyUserDepartmentList.component.html',
  styleUrls: ['./companyUserDepartmentList.component.css'],
  imports: [CommonModule, FormsModule, FilterCompanyUserDepartmentByUserPipe],
})
export class CompanyUserDepartmentListComponent implements OnInit {
  companyUserDepartments: CompanyUserDepartment[] = [];
  companyUserDepartment: CompanyUserDepartment;
  userDTOs: UserDTO[] = [];
  dataLoaded = false;
  filter1: string = '';
  admin: boolean = false;
  componentTitle = 'Company User Departments';

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
    this.companyUserDepartmentService.getAll().subscribe(
      (response) => {
        this.validationService.handleSuccesses(response);
        this.companyUserDepartments = response.data.filter(
          (f) => f.departmentName != '-'
        );
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
    this.companyUserDepartments.forEach((companyUserDepartment) => {
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
