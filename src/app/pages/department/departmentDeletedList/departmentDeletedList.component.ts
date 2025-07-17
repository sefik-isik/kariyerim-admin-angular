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
import { IsCompanyPipe } from '../../../pipes/isCompany.pipe';

@Component({
  selector: 'app-departmentDeletedList',
  templateUrl: './departmentDeletedList.component.html',
  styleUrls: ['./departmentDeletedList.component.css'],
  imports: [CommonModule, FormsModule, FilterDepartmentPipe, IsCompanyPipe],
})
export class DepartmentDeletedListComponent implements OnInit {
  departments: Department[] = [];
  dataLoaded = false;
  filter1 = '';
  componentTitle = 'Deleted Departments';
  constructor(
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getDepartments();
    this.modalService.activeInstances.subscribe((x) => {
      if (x.length == 0) {
        this.getDepartments();
      }
    });
  }

  getDepartments() {
    this.departmentService.getDeletedAll().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDelete(department: Department) {
    this.departmentService.update(department).subscribe(
      (response) => {
        this.ngOnInit();
        this.toastrService.success('Başarı ile geri alındı');
      },
      (responseError) => this.toastrService.error(responseError.error.message)
    );
  }

  unDeleteAll() {
    this.departments.forEach((department) => {
      this.departmentService.update(department).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile geri alındı');
    }, 500);
  }

  terminate(department: Department) {
    if (!confirm('Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.departmentService.terminate(department).subscribe(
      (response) => {
        this.toastrService.success('Başarı ile kalıcı olarak silindi');
        this.ngOnInit();
      },
      (responseError) => console.log(responseError)
    );
  }

  terminateAll() {
    if (!confirm('Tümünü Kalıcı Olarak Silmek istediğinize emin misiniz?')) {
      this.toastrService.info('Silme İşlemi İptal Edildi');
      return;
    }

    this.departments.forEach((department) => {
      this.departmentService.terminate(department).subscribe(
        (response) => {},
        (responseError) => this.toastrService.error(responseError.error.message)
      );
    });
    setTimeout(() => {
      this.ngOnInit();
      this.toastrService.success('Tümü Başarı ile kalıcı olarak silindi');
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
}
