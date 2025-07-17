import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentUpdateComponent } from '../departmentUpdate/departmentUpdate.component';
import { DepartmentDetailComponent } from '../departmentDetail/departmentDetail.component';
import { Department } from '../../../models/component/department';
import { DepartmentService } from '../../../services/department.service';
import { FilterDepartmentPipe } from '../../../pipes/filterDepartment.pipe';
import { AuthService } from '../../../services/auth.service';
import { IsCompanyPipe } from '../../../pipes/isCompany.pipe';
import { FilterisDepartmentPipe } from '../../../pipes/filterisDepartment.pipe';

@Component({
  selector: 'app-departmentList',
  templateUrl: './departmentList.component.html',
  styleUrls: ['./departmentList.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    FilterDepartmentPipe,
    IsCompanyPipe,
    FilterisDepartmentPipe,
  ],
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  dataLoaded = false;
  filter1: string = '';
  filter2: boolean;
  filters: boolean[] = [true, false];
  admin: boolean = false;
  componentTitle = 'Deleted Departments';

  constructor(
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.isAdmin();
    this.getDepartments();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDepartments();
      }
    });
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(
      (response) => {
        this.departments = response.data.filter((f) => f.departmentName != '-');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  delete(department: Department) {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.departmentService.delete(department).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile silindi');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  deleteAll() {
    if (!this.authService.isAdmin()) {
      this.toastrService.info('Bu işlem için yetkiniz bulunmamaktadır');
      return;
    }
    if (!confirm('Tümünü Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }
    this.departments.forEach((department) => {
      this.departmentService.delete(department).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile silindi');
    }, 500);
  }

  open(department: Department) {
    const modalRef = this.modalService.open(DepartmentUpdateComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.department = department;
  }

  openDetail(department: Department) {
    const modalRef = this.modalService.open(DepartmentDetailComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true,
      centered: true,
      scrollable: false,
      windowClass: 'modal-holder',
      backdropClass: 'modal-backdrop',
    });
    modalRef.componentInstance.department = department;
  }

  clearInput1() {
    this.filter1 = null;
    this.getDepartments();
  }

  clearInput2() {
    this.filter2 = null;
    this.getDepartments();
  }
}
